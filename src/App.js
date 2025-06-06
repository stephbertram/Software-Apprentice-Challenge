import React, { useEffect, useState } from 'react';

function App() {
  const [ads, setAds] = useState([]);

  const standardizeAd = (ad) => {
    return {
      campaign: ad.campaign || ad.campaign_name || ad.utm_campaign || 'Unknown',
      adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium || 'Unknown',
      creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content || 'Unknown',
      spend: ad.spend || ad.cost || 0,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || ad.post_clicks || 0,
      results: ad.results || 0,
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/fakeDataSet')
      .then(res => res.json())
      .then(data => {
        const combinedAds = [
          ...data.facebook_ads,
          ...data.twitter_ads,
          ...data.snapchat_ads, 
        ]

        const standardized = combinedAds.map(standardizeAd)
        setAds(standardized)
      }) 
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h1>Ads</h1>
      <pre>{JSON.stringify(ads, null, 2)}</pre>
    </div>
  )
}

export default App;