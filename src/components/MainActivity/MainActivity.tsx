import React, { useEffect, useState } from 'react';
import './mainactivity.scss';
import Chart from '../Chart/Chart';
import { MainDataInterface } from '../../state/app-state';

export default function MainActivity() {
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [companyData, setCompanyData] = useState<MainDataInterface[]>([]);
  const [positiveSentimentData, setPositiveSentimentData] = useState<any[]>([]);
  const [negativeSentimentData, setNegativeSentimentData] = useState<any[]>([]);
  const [reachSentimentData, setReachSentimentData] = useState<any[]>([]);

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
      }
    ]

    setCompanyData(data);
    setCompanyNames(getCompanyNames());
    setPositiveSentimentData(seperateData('positive'));
    setNegativeSentimentData(seperateData('negative'));
    setReachSentimentData(seperateData('reach'));

  }, [companyData?.length]);

  function seperateData(type: 'positive' | 'negative' | 'reach'): any[] {
    let newData: any[] = [];
    companyData.map((data: MainDataInterface) => {
      if (type === 'positive' ) {
        const newDailyReviewCounts = data.daily_review_counts.map(({ date, positive_count }) => ({
          date,
          positive_count
        }));
        newData.push({
          company_name: data.company_name,
          daily_review_count: newDailyReviewCounts
        });
      } else if(type === 'negative') {
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
      return <div className={isChipSeleted ? "dashboard__header__chip selected" : "dashboard__header__chip"} key={index}>
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
    // remove
    if (selectedChips.indexOf(company) !== -1) {
      setSelectedChips(selectedChips.filter((chip) => chip !== company))
    } else {
      // add
      let obj: any = companyData.filter(data => data.company_name === company)[0];
      setSelectedChips([...selectedChips, company]);
    }
  }



  return (
    <div className='dashboard'>
      <div className="dashboard__header">
        {mapChips()}
      </div>

      <main className="dashboard__cards">
        <div className="dashboard__cards__card dashboard__cards__card--psentiment">
          <h2>😀 Positive Sentiments</h2>
          <Chart data={positiveSentimentData} />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--nsentiment">
          <h2>😟 Negative Sentiments</h2>
          <Chart data={negativeSentimentData} />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--reach">
          <h2>📈 Reach</h2>
          <Chart data={reachSentimentData} />
        </div>
      </main>
    </div>
  )
}
