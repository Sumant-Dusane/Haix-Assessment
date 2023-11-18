import React, { useEffect, useState } from 'react';
import './mainactivity.scss';
import Chart from '../Chart/Chart';

export default function MainActivity() {
  const arr = ["Amazon", "Barclays", "Haix", "Google"];
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const mapChips = () => {
    return arr.map((company: string, index: number) => {
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
    if(selectedChips.indexOf(company) !== -1) {
      setSelectedChips(selectedChips.filter((chip) => chip !== company))
    } else {
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
          <Chart />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--nsentiment">
          <h2>😟 Negative Sentiments</h2>
          <Chart />
        </div>
        <div className="dashboard__cards__card dashboard__cards__card--reach">
          <h2>📈 Reach</h2>
          <Chart />
        </div>
      </main>
    </div>
  )
}
