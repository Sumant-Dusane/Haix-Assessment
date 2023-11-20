import React, { useEffect, useState } from 'react';
import './mainactivity.scss';
import Chart from '../Charts/Chart';
import { MainDataInterface } from '../../state/app-state';

export default function MainActivity() {
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [companyData, setCompanyData] = useState<MainDataInterface[]>([]);
  const [selectedCompanyData, setSelectedCompanyData] = useState<MainDataInterface[]>([]);
  const [positiveSentimentData, setPositiveSentimentData] = useState<any[]>([]);
  const [negativeSentimentData, setNegativeSentimentData] = useState<any[]>([]);
  const [reachSentimentData, setReachSentimentData] = useState<any[]>([]);
  const [isChartLine, setChartType] = useState<boolean>(true);
  const [currentSource, setCurrentSource] = useState<'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'facebook'>('tiktok')

  useEffect(() => {
    let data: MainDataInterface[] = [
      {
        company_name: "Amazon",
        daily_review_counts: [
          {
            date: "2023-06-01",
            positive_count: 3500,
            negative_count: 1500,
            maximum_reach: 3000
          },
          {
            date: "2023-06-02",
            positive_count: 2500,
            negative_count: 3000,
            maximum_reach: 5500
          },
          {
            date: "2023-06-03",
            positive_count: 10000,
            negative_count: 5500,
            maximum_reach: 15500
          }
        ]
      },
      {
        company_name: "Barclays",
        daily_review_counts: [
          {
            date: "2023-06-01",
            positive_count: 3500,
            negative_count: 500,
            maximum_reach: 4000
          },
          {
            date: "2023-06-02",
            positive_count: 4250,
            negative_count: 250,
            maximum_reach: 4500
          },
          {
            date: "2023-06-03",
            positive_count: 18500,
            negative_count: 2000,
            maximum_reach: 20500
          }
        ]
      },
      {
        company_name: "BlackRock",
        daily_review_counts: [
          {
            date: "2023-06-01",
            positive_count: 10500,
            negative_count: 100,
            maximum_reach: 8000
          },
          {
            date: "2023-06-02",
            positive_count: 20250,
            negative_count: 50,
            maximum_reach: 6500
          },
          {
            date: "2023-06-03",
            positive_count: 500,
            negative_count: 5000,
            maximum_reach: 50500
          }
        ]
      },
      {
        company_name: "Vanguard",
        daily_review_counts: [
          {
            date: "2023-06-01",
            positive_count: 20500,
            negative_count: 150,
            maximum_reach: 8000
          },
          {
            date: "2023-06-02",
            positive_count: 10250,
            negative_count: 550,
            maximum_reach: 6500
          },
          {
            date: "2023-06-03",
            positive_count: 700,
            negative_count: 8000,
            maximum_reach: 90500
          }
        ]
      },
      {
        company_name: "Sumant Dusane Inc.",
        daily_review_counts: [
          {
            date: "2023-06-01",
            positive_count: 13500,
            negative_count: 200,
            maximum_reach: 54000
          },
          {
            date: "2023-06-02",
            positive_count: 44250,
            negative_count: 200,
            maximum_reach: 34500
          },
          {
            date: "2023-06-03",
            positive_count: 98500,
            negative_count: 1000,
            maximum_reach: 90500
          }
        ]
      },
    ]

    setCompanyData(data);
    setCompanyNames(getCompanyNames());
    setPositiveSentimentData(seperateData('positive'));
    setNegativeSentimentData(seperateData('negative'));
    setReachSentimentData(seperateData('reach'));

  }, [companyData?.length, selectedCompanyData?.length, positiveSentimentData?.length, negativeSentimentData?.length, reachSentimentData?.length, isChartLine]);

  function seperateData(type: 'positive' | 'negative' | 'reach'): any[] {
    let newData: any[] = [];
    selectedCompanyData.map((data: MainDataInterface) => {
      if (type === 'positive') {
        const newDailyReviewCounts = data.daily_review_counts.map(({ date, positive_count }) => ({
          date,
          positive_count
        }));
        newData.push({
          company_name: data.company_name,
          daily_review_count: newDailyReviewCounts
        });
      } else if (type === 'negative') {
        const newDailyReviewCounts = data.daily_review_counts.map(({ date, negative_count }) => ({
          date,
          negative_count
        }));
        newData.push({
          company_name: data.company_name,
          daily_review_count: newDailyReviewCounts
        });
      } else if (type === 'reach') {
        const newDailyReviewCounts = data.daily_review_counts.map(({ date, maximum_reach }) => ({
          date,
          maximum_reach
        }));
        newData.push({
          company_name: data.company_name,
          daily_review_count: newDailyReviewCounts
        });
      }
    })

    return newData;
  }

  function getCompanyNames() {
    let arr: string[] = [];
    companyData.forEach((data, index): any => {
      arr.push(data.company_name);
    })
    return arr;
  }

  const mapChips = () => {
    return companyNames?.map((company: string, index: number) => {
      let isChipSeleted = selectedChips.indexOf(company) !== -1;
      return <div className={isChipSeleted ? "dashboard__header__chips__chip selected" : "dashboard__header__chips__chip"} key={index}>
        {company}
        <input
          type="checkbox"
          name={company}
          checked={isChipSeleted}
          onChange={() => handleChipsState(company)}
        />
      </div>
    })
  }

  const handleChipsState = (company: string) => {
    if (selectedChips.indexOf(company) !== -1) {
      // remove
      setSelectedChips(selectedChips.filter((chip) => chip !== company))
      setSelectedCompanyData(selectedCompanyData.filter((data) => data.company_name !== company));
    } else {
      // add
      setSelectedChips([...selectedChips, company]);
      let newObj = companyData.filter(data => data.company_name === company)[0];
      setSelectedCompanyData([...selectedCompanyData, newObj]);
    }
  }

  const clearChart = () => {
    setSelectedChips([]);
    setSelectedCompanyData([]);
  }

  return (
    <div className='dashboard'>
      <div className="dashboard__header">
        <div className="dashboard__header__chips">
          {mapChips()}
          <button onClick={clearChart} className="dashboard__header__chips__button">Clear All Companies</button>
        </div>
        {/* <div className="dashboard__header__toggle-chart">
          <span>📈</span>
          <label className="switch">
            <input type="checkbox" onChange={() => setChartType(!isChartLine)} />
            <span className="slider"></span>
          </label>
          <span>📊</span>
        </div> */}

      </div>

      <div className="dashboard__formcontrol">
        <div className="dashboard__formcontrol__dselection">
          <div>
            Days Selection
            <label><input type="radio" name="days" id="days" />  Days</label>
            <label><input type="radio" name="days" id="days" />  Custom Range</label>
          </div>
          <div>
            Number of Days
            <input type="text" placeholder="10" />
          </div>
        </div>
        <div className="dashboard__formcontrol__bsearch">
          🔎 Boolean Search
        </div>
        <button className="dashboard__formcontrol__fetch-insights">
          🌏 Fetch Insights
        </button>
        <div className="dashboard__formcontrol__chips-display">
          Showing Analysis for <span>{selectedChips.toString()}</span>
        </div>
      </div>
      {/* <div className="dashboard__sub-nav">
        <div className={currentSource == 'twitter' ? "dashboard__sub-nav__source active" : "dashboard__sub-nav__source"}>
          <img src="https://bayrivercolleges.ca/files/logo-x-twitter.svg" alt="X.com"/>
          <input type="radio" name="insight-source" onChange={() => setCurrentSource('twitter')}/>
        </div>
        <div className={currentSource == 'instagram' ? "dashboard__sub-nav__source active" : "dashboard__sub-nav__source"}>
          <img src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-stunning-instagram-logo-vector-download-for-new-7.png" alt="Instagram"/>
          <input type="radio" name="insight-source" onChange={() => setCurrentSource('instagram')}/>
        </div>
        <div className={currentSource == 'tiktok' ? "dashboard__sub-nav__source active" : "dashboard__sub-nav__source"}>
          <img src="https://1000logos.net/wp-content/uploads/2019/06/Tiktok_Logo.png" alt="Tiktok"/>
          <input type="radio" name="insight-source" onChange={() => setCurrentSource('tiktok')}/>
        </div>
        <div className={currentSource == 'youtube' ? "dashboard__sub-nav__source active" : "dashboard__sub-nav__source"}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" alt="YouTube"/>
          <input type="radio" name="insight-source" onChange={() => setCurrentSource('youtube')}/>
        </div>
        <div className={currentSource == 'facebook' ? "dashboard__sub-nav__source active" : "dashboard__sub-nav__source"}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="Facebook"/>
          <input type="radio" name="insight-source" onChange={() => setCurrentSource('facebook')}/>
        </div>
      </div> */}

      <div className="dashboard__companies">
        <div className="dashboard__companies__company">
          <div className='logo'><img src="https://www.edigitalagency.com.au/wp-content/uploads/TikTok-icon-glyph.png" alt="Tiktok" /></div>
          <input type="text" className="title" placeholder="doritos" />
          <button className="button">✏️</button>
        </div>
      </div>

      <div className="dashboard__insight-control">
        <button className='selected'>Actionable Insight</button>
        <button>My Favourite View</button>
      </div>

      <main className="dashboard__cards">
        <div className="dashboard__cards__card dashboard__cards__card--psentiment">
          <h2>😀 Positive Sentiments</h2>
          <Chart data={positiveSentimentData} type={isChartLine ? 'line' : 'bar'} />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--nsentiment">
          <h2>😀 Negative Sentiments</h2>
          <Chart data={negativeSentimentData} type={isChartLine ? 'line' : 'bar'} />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--reach">
          <h2>📈 Reach</h2>
          <Chart data={reachSentimentData} type={isChartLine ? 'line' : 'bar'} />
        </div>
      </main>
    </div>
  )
}
