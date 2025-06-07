import React from 'react';

function AdCard ({ ad }) {
    return (
        <div>
            <h2><strong>Campaign:</strong> {ad.campaign}</h2>
            <p>Adset: {ad.adset}</p>
            <p>Creative: {ad.creative}</p>
            <p>Spend: ${ad.spend.toLocaleString()}</p>
            <p>Impressions: {ad.impressions.toLocaleString()}</p>
            <p>Clicks: {ad.clicks.toLocaleString()}</p>
            <p>Results: {ad.results.toLocaleString()}</p>
        </div>
    )
}

export default AdCard;