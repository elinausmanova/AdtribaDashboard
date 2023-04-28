import './ValueCard.css';

function ValueCard({ title, value }) {
    return (
        <div className="valueCard">
            <div className="valueCardInfo">
                <div className="valueCardTitle">
                    {title}
                </div>
                <div className="valueCardValue">
                    <div className="valueCardCurrency">
                        €
                    </div>
                    <div className="valueCardNumber">
                        {(value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'Eur',
                        }).split('€')[1]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValueCard;