import os
from crewai import Agent
from langchain_google_genai import ChatGoogleGenerativeAI
from crewai.tools import tool
from langchain_community.utilities import SerpAPIWrapper
from dotenv import load_dotenv

load_dotenv()

# Verify API key
google_api_key = os.getenv("GOOGLE_API_KEY")

# Setup Gemini LLM using the direct LangChain Google GenAI provider
# Setting transport='rest' can sometimes resolve 403 issues related to gRPC
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=google_api_key,
    temperature=0.5,
    transport="rest"
)

# Setup Search Tool
search = SerpAPIWrapper(serpapi_api_key=os.getenv("SERPAPI_API_KEY"))

@tool("market_search")
def search_tool(query: str):
    """Useful for searching the internet for current market data and competitor information."""
    return search.run(query)

def create_researcher():
    return Agent(
        role='Market Researcher',
        goal='Gather comprehensive market intelligence on {topic}',
        backstory="""You are a elite market researcher with 'Violet Clearance'. 
        You specialize in raw intelligence gathering and competitive landscape mapping.
        You use search tools to find the latest trends, players, and data points.""",
        allow_delegation=False,
        verbose=True,
        llm=llm,
        tools=[search_tool]
    )

def create_analyst():
    return Agent(
        role='Strategic Analyst',
        goal='Process market research into deep strategic insights for {topic}',
        backstory="""You are a senior strategic analyst with 'Amber Clearance'.
        You excel at identifying market gaps, competitor weaknesses, and performing SWOT analysis.
        You turn raw data into strategic intelligence.""",
        allow_delegation=False,
        verbose=True,
        llm=llm
    )

def create_writer():
    return Agent(
        role='Executive Brief Writer',
        goal='Synthesize strategic findings into a polished 5-section executive report for {topic}',
        backstory="""You are an elite business intelligence writer with 'Green Clearance'.
        You transform complex strategic analysis into C-suite ready executive briefs.
        Your reports are structured, authoritative, and actionable.""",
        allow_delegation=False,
        verbose=True,
        llm=llm
    )
