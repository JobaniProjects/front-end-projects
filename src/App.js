import React from 'react';
import './index.scss';

let quoteTwitterUrl = '';
let symbols= '+-+';
let authorTwitterUrl = '';
let twitterUrl = 'https://twitter.com/intent/tweet?text=';
let tweetQuote ='';


class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            url: ''
        }
        this.fetchQuote = this.fetchQuote.bind(this);
        this.adjustTweetUrl = this.adjustTweetUrl.bind(this);
    }

    adjustTweetUrl(){
        quoteTwitterUrl = '"' + this.state.quote.replace(/\s/g,"+") + '"';
        authorTwitterUrl = symbols + this.state.author.replace(/\s/g, "+"); 
        tweetQuote = twitterUrl + quoteTwitterUrl + authorTwitterUrl; 
        // console.log("twitter URL to tweet: ", tweetQuote);
        this.setState({
            url: tweetQuote
        });
    }

    fetchQuote(){
        // let quoteData = [];
        // let authorData = [];
        // let ranNum = Math.floor(Math.random() * 19);
        // let ranPageNum = Math.floor(Math.random() * 30);
        // let apiLink = 'https://api.quotable.io/quotes?page='.concat(ranPageNum);
        // console.log("Link to api pages: ", apiLink);
        // fetch(apiLink)
        //     .then((res)=>res.json())
        //     .then((data)=>{
        //         quoteData = data["results"][ranNum]["content"];
        //         authorData = data["results"][ranNum].author;
        //         this.setState({
        //             quote: quoteData,
        //             author: authorData
        //         });
        //         this.adjustTweetUrl();
        //         // console.log("API Quotes: ", data);
        //     })
        //     .catch((err)=>console.error('Error: ', err));

        //----------------------------------------------------------------
        //Version 2
        let quoteData = [];
        let authorData = [];
        
        
        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.REACT_APP_API_KEY
            }
        }
        
        let apiLink = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
        // console.log("Link to api pages: ", apiLink);
        fetch(apiLink, options)
            .then((res)=>res.json())
            .then((data)=>{
                quoteData = data[0]["quote"];
                authorData = data[0]["author"];
                this.setState({
                    quote: quoteData,
                    author: authorData
                });
                this.adjustTweetUrl();
                // console.log("API Quotes: ", data);
            })
            .catch((err)=>console.error('Error: ', err));

    }

    componentDidMount(){
        this.fetchQuote();
    }

    render(){
        return (
            <div>
                <div id="quote-box">
                    <div id="text" className="text-center">
                        <p>"{this.state.quote}"</p>
                    </div>
                    <div id="author">
                        <p>- {this.state.author}</p>
                    </div>
                    <button className='btn btn-dark'><a id="tweet-quote" href={tweetQuote} target="_blank" rel="noreferrer"><i className="bi bi-twitter-x"></i></a></button>
                    <button id="new-quote" className='btn btn-dark' onClick={this.fetchQuote}>New Quote</button>
                </div>
            </div>
        );
    }
}

const App = ()=>{
    return (
        <div>
            <QuoteMachine />
        </div>
    );
}
export default App;