import './TypeCard.css';

function TypeCard({ type, sources, colors }) {

    return (
        <div className="typeCard">
            <div className='typeCardTitle'>
                <div className='typeCardType'>{type}</div>
                <div className='typeCardCount'>{sources.length} sources</div>
            </div>
            <div className="sourceList">
                {sources.map((source, index) =>
                    <div key={source} style={{ background: colors[source.split('. ')[0] - 1] }} className="source">
                        {source.replaceAll('_', ' ')}
                    </div>)
                }
            </div>
        </div>
    )
}

export default TypeCard;