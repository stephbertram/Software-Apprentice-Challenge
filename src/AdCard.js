import React from 'react';

function AdCard ({ ad }) {
    return (
        <div className='bg-gray-100 shadow-md rounded-lg p-4 mb-4 border border-gray-200'>
            <h2 className='text-lg font-semibold mb-2'>Campaign: {ad.campaign}</h2>
            <p><span className='font-bold'>Adset:</span> {ad.adset}</p>
            <p><span className='font-bold'>Creative:</span> {ad.creative}</p>
            <p><span className='font-bold'>Spend:</span> ${ad.spend.toLocaleString()}</p>
            <p><span className='font-bold'>Impressions:</span> {ad.impressions.toLocaleString()}</p>
            <p><span className='font-bold'>Clicks:</span> {ad.clicks.toLocaleString()}</p>
            <p><span className='font-bold'>Results:</span> {ad.results.toLocaleString()}</p>
        </div>
    )
}

export default AdCard;