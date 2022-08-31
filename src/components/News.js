import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {


    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

        document.title = `${props.category} - News`;

    const updateNews = async()=> {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=490364a1745d45bb9cf17c6b3edd6d28&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parshData = await data.json();
        setArticles(parshData.articles)
        setLoading(false)
        setTotalResults(parshData.totalResults)
    }

    useEffect(() => {
        updateNews();
      }, [])
    

    const fetchMoreData = async () => {
        setPage(page-1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=490364a1745d45bb9cf17c6b3edd6d28&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parshData = await data.json();
        setArticles(articles.concat(parshData.articles))
        setTotalResults(parshData.totalResults)
      };
        return (
            <>
                <h1 className='text-center' style={{ margin: "50px 0px",marginTop:"90px" }}>NewsMonkey - Top  {props.category} Headlines</h1>
                { loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={ articles.length}
                    next={fetchMoreData}
                    hasMore={ articles.length !==  totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                    <div className="row">
                        { articles.map((element) => {
                            return <div className="col-md-auto col-lg-4 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                
            </>
        )
                    }

News.defaultProps = {
    country: "in",
    page: 6,
    category: "General"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News