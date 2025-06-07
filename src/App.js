import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

function App() {
  const [ads, setAds] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const standardizeAd = (ad, gaData) => {
    const campaign = ad.campaign || ad.campaign_name || ad.utm_campaign || 'Unknown'
    const adset = ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium || 'Unknown'
    const creative = ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content || 'Unknown'

    // Match with GA data
    const matchedGA = gaData.find(entry =>
      entry.utm_campaign === campaign &&
      entry.utm_medium === adset &&
      entry.utm_content === creative
    )

    // console.log('Matched GA:', matchedGA)
    
    return {
      campaign,
      adset,
      creative,
      spend: ad.spend || ad.cost || 0,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || ad.post_clicks || 0,
      results: matchedGA?.results || 0
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/fakeDataSet')
      .then(res => res.json())
      .then(data => {
        const gaData = data.google_analytics

        const combinedAds = [
          ...data.facebook_ads,
          ...data.twitter_ads,
          ...data.snapchat_ads, 
        ]

        const standardized = combinedAds.map(ad => standardizeAd(ad, gaData))
        setAds(standardized)
      }) 
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h1>Ad Dashboard</h1>
      <label htmlFor='sortOrder'>Sort by Spend:</label>
      <select
        id='sortOrder'
        value={sortOrder || ''}
        onChange={e => setSortOrder(e.target.value || null)}
      >
        <option value=''>Clear Sort</option>
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </select>
      {[...ads]
        .sort((a,b) => {
          if (sortOrder === 'asc') return a.spend - b.spend
          if (sortOrder === 'desc') return b.spend - a.spend
          return 0
        })
      .map((ad, index) => <AdCard key={index} ad={ad} />)}
      {/* <pre>{JSON.stringify(ads, null, 2)}</pre> */}
    </div>
  )
}

export default App;