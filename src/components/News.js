import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `ClickNews ${capitalizeFirstLetter(props.category)}`;
    
    

    const  capitalizeFirstLetter = (string) =>{

        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    const fetchMoreData = async () => {
        
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page +1);
        let data = await fetch(url);
        let parsedData =  await data.json();
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        // setState({ articles: articles.concat(parsedData.articles), 
        //                 totalResults: parsedData.totalResults});

      
       
      };

    
      const  updateNews = async () =>{
     
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&?q=Sidharth`;
        // setState({loading:true});
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData =  await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setPage(page +1);
        setTotalResults(parsedData.totalResults);
        props.setProgress(70);
        props.setProgress(100);
    }

   

  useEffect(() => {
    
      updateNews();
       // eslint-disable-next-line
    }, [])

   
// const  handlePreviousClick = async () => {
//      setPage(page -1);
//      updateNews();
// }
//   const handleNextClick = async () => {
//     setPage(page +1);
//     updateNews();
// }

        return (
            <>
                <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}} >ClickNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1> 
              {loading && <Spiner/>}
              <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spiner/>}
                >
                <div className="container">
                <div className="row">
                { articles.map((element) =>{
                return <div className="col-md-4" key={element.url} >
                    <NewsItem title={element.title? element.title.slice(0,45): "...."}  description={element.description?element.description.slice(0,88): "...."}  imageUrl={element.urlToImage?element.urlToImage:"https://i.dailymail.co.uk/1s/2021/09/01/18/47383527-0-image-a-11_1630516304830.jpg"}  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div> 
                })}
               </div>
               </div> 
               </InfiniteScroll>
               {/* <div className="container d-flex justify-content-between">
               <button disabled={page<=1} type="button" className="btn btn-dark"onClick={handlePreviousClick}> &larr; Previous</button>
               <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}> Next &rarr;</button>
               </div> */}
            </>
        )
           
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'health',
    apiKey: '',

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
}

export default News
