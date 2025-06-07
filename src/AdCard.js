import React from 'react';

function AdCard ({ ad }) {
    return (
        <div>
            <h2><strong>Campaign:</strong> {ad.campaign}</h2>
            <p>Adset: {ad.adset}</p>
            <p>Creative: {ad.creative}</p>
            <p>Spend: ${ad.spend}</p>
            <p>Impressions: {ad.impressions}</p>
            <p>Clicks: {ad.clicks}</p>
            <p>Results: {ad.results}</p>
        </div>
    )
}

export default AdCard;