import React from 'react'

const NewsItem = (props) => {

    let {title, description, imgUrl,newsUrl,author,date,source} = props;
    return (
        <div className='my-3'>
            <div className="card" >
                <div style={{
                  display:'flex',
                  justifyContent:'flex-end',
                  position: 'absolute',
                  right:'0'
                }}>
                  <span className="badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                    {source}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
                    
                <img src={imgUrl?imgUrl:"https://mms.businesswire.com/media/20230709354947/en/1835823/23/Prime_Day_Retail_Replay.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}
                    
                    </h5>
                    
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
                
            </div>
        </div>
    )
}

export default NewsItem
