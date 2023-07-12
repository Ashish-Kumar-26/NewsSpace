import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles,setArticles] = useState([])
    const [,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)
    const [hasMore,setHasMore] = useState(true)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () =>{
      props.setProgress(20);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } 

    useEffect(() =>  {
      document.title=`${capitalizeFirstLetter(props.category)} - NewsSpaceX`;
      updateNews();
      //eslint-disable-next-line
    },[])

    // const handlePrevClick = async() =>{
    //   setPage(page - 1);
    //   updateNews();
    // }
    // const handleNextClick = async() =>{
    //   setPage(page + 1);
    //   updateNews();
    // }

    const fetchMoreData = async() => {
      if (articles.length >= totalResults) {
        setHasMore(false);
        return;
      }
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }

    return (
      <>
        <h1 className='text-center' style={{marginTop:'80px'}}>NewsSpace - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          
          hasMore={hasMore}
          // hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          endMessage={
            <p className='fs-3' style={{ textAlign: "center" }}>
              <strong>This section ends up! Explore other categories! </strong>
            </p>
          }
        >
          
          <div className="container">
            <div className="row">
                {articles.map((element)=>{
                  return <div className='col-md-4' key ={element.url}>
                        <NewsItem title={element.title} 
                            description ={element.description}
                            imgUrl = {element.urlToImage}
                            newsUrl ={element.url}
                            author = {element.author}
                            date = {element.publishedAt}
                            source = {element.source.name}/>
                    </div>
                })}
            </div>
          </div>

        </InfiniteScroll>

        {/* <div className='container d-flex justify-content-between'>
            <button disabled = {page <= 1} type="button" class="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
            <button disabled = {page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
        
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 9
}

News.propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
}

export default News
