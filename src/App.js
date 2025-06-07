import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

function App() {
  const [ads, setAds] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const sortedFilteredAds = [...ads]
    .sort((a,b) => {
      if (sortOrder === 'asc') return a.spend - b.spend
      if (sortOrder === 'desc') return b.spend - a.spend
      return 0
    })
    .filter(ad => ad.campaign.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Ad Dashboard</h1>

      <div className='mb-6 space-y-4'>
        {/* Sort Spend*/}
        <div>
          <label htmlFor='sortOrder' className='block font-medium mb-1'>Sort by Spend:</label>
          <select
            id='sortOrder'
            value={sortOrder || ''}
            onChange={e => setSortOrder(e.target.value || null)}
            className='block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Clear Sort</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>

        {/* Search Campaign Name*/}
        <div>
          <label htmlFor='search' className='block font-medium mb-1'>Search by Campaign Name:</label>
          <input
            id='search'
            type='text'
            value={searchTerm}
            onChange={ e => setSearchTerm(e.target.value)}
            placeholder='Enter campaign name'
            className='block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* Render Filtered & Sorted Ads */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {sortedFilteredAds.map((ad, index) => <AdCard key={index} ad={ad} />)}
      </div>
    </div>
  )
}

export default App;