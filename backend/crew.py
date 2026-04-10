import asyncio
from crewai import Crew, Process
from agents import create_researcher, create_analyst, create_writer
from tasks import create_research_task, create_analysis_task, create_write_report_task

class ResearchCrew:
    def __init__(self, topic, log_callback=None, loop=None):
        self.topic = topic
        self.log_callback = log_callback
        self.loop = loop or asyncio.get_event_loop()
        
        self.researcher = create_researcher()
        self.analyst = create_analyst()
        self.writer = create_writer()

    def _step_callback(self, step_output):
        if self.log_callback:
            asyncio.run_coroutine_threadsafe(self.log_callback(step_output), self.loop)

    def _task_callback(self, task_output):
        if self.log_callback:
            agent_role = task_output.agent if hasattr(task_output, 'agent') else "Unknown"
            msg = f"Task Complete by {agent_role}"
            asyncio.run_coroutine_threadsafe(self.log_callback(msg, status="done"), self.loop)

    def run(self):
        research_task = create_research_task(self.researcher, self.topic)
        analysis_task = create_analysis_task(self.analyst, "") 
        analysis_task.context = [research_task]
        write_report_task = create_write_report_task(self.writer, "", self.topic)
        write_report_task.context = [analysis_task]
        
        crew = Crew(
            agents=[self.researcher, self.analyst, self.writer],
            tasks=[research_task, analysis_task, write_report_task],
            process=Process.sequential,
            verbose=True,
            step_callback=self._step_callback,
            task_callback=self._task_callback
        )
        
        result = crew.kickoff(inputs={'topic': self.topic})
        return str(result)
