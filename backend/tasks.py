from crewai import Task

def create_research_task(agent, topic):
    return Task(
        description=f"Perform comprehensive market research on {topic}. "
                    f"Gather data on market size, key players, recent trends, "
                    f"customer segments, and growth drivers. Use the available search tools.",
        expected_output="A detailed market intelligence package covering all requested sectors.",
        agent=agent
    )

def create_analysis_task(agent, research_output=None):
    return Task(
        description=f"Analyze the market research provided in the context and perform deep strategic analysis. "
                    f"Identify market gaps, competitor weaknesses, and provide a complete SWOT matrix.",
        expected_output="A strategic insight file with SWOT and competitive positioning.",
        agent=agent
    )

def create_write_report_task(agent, analysis_output=None, topic=""):
    return Task(
        description=f"Synthesize the strategic analysis provided in the context into a polished 5-section executive report for {topic}. "
                    f"Structure: 1. Executive Summary, 2. Market Landscape, "
                    f"3. Competitive Analysis & SWOT, 4. Market Gaps, 5. Strategic Recommendations.",
        expected_output="A complete, Markdown-formatted 5-section executive report ready for C-suite.",
        agent=agent
    )
