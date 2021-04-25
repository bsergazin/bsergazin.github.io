import React from 'react';
import msftLogo from '../img/MSFT.png'
import applLogo from '../img/AAPL.png'
import amznLogo from '../img/AMZN.png'
import nflxLogo from '../img/NFLX.png'
import fbLogo from '../img/FB.png'
import snapLogo from '../img/SNAP.png'
import googLogo from '../img/GOOG.png'
import wmtLogo from '../img/WMT.png'
import bpLogo from '../img/BP.png'
import tslaLogo from '../img/TSLA.png'
import dellLogo from '../img/DELL.png'
import spotLogo from '../img/SPOT.png'
import twtrLogo from '../img/TWTR.png'
import hpqLogo from '../img/HPQ.png'
import ebayLogo from '../img/EBAY.png'
import raceLogo from '../img/RACE.png'

const logoMap = {
    'MSFT': msftLogo,
    'AAPL': applLogo,
    'AMZN': amznLogo,
    'NFLX': nflxLogo,
    'FB': fbLogo,
    'SNAP': snapLogo,
    'GOOG': googLogo,
    'WMT': wmtLogo,
    'BP': bpLogo,
    'TSLA': tslaLogo,
    'DELL': dellLogo,
    'SPOT': spotLogo,
    'TWTR': twtrLogo,
    'HPQ': hpqLogo,
    'EBAY': ebayLogo,
    'RACE': raceLogo
}

class TickerWindow extends React.Component {
    render() {
        return (
            <div className='tickerWindow'>
                <img src={logoMap[this.props.ticker]} alt = 'logo'/>
                <div className='tickersPrice'>
                    <h6>{this.props.ticker}</h6>
                    <h6>{this.props.price}</h6>
                </div>
                <div className='tickersQuant'>
                    <button onClick={this.props.onRemove} value={this.props.ticker}>-</button>
                    <h6>{this.props.qty}</h6>
                    <button onClick={this.props.onAdd} value={this.props.ticker}>+</button>
                </div>
            </div>
        )   
    }
}

class MainPage extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            quotes: {},
            quants: {}
        }
        this.handleAddShare = this.handleAddShare.bind(this)
        this.handleRemoveShare = this.handleRemoveShare.bind(this)
    }

/*  //API version of rapidapi.com
    const unirest = require("unirest");
    componentDidMount() {
        let mrktQuotes = {}
        unirest
            .get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes')
            .query({
                "region": "US",
                "symbols": "AAPL"
            })
            .headers({
                "x-rapidapi-key": REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "useQueryString": true
            })
            .then((res) => {
                if (res.error) throw new Error(res.error);
                const json =  res.body.quoteResponse.result
                for (let i = 0; i < json.length; i++) {
                    mrktQuotes[json[i].symbol] = json[i].regularMarketPrice;
                }
                this.setState({quotes:mrktQuotes})
            })
    }
 */
    //offline version
    componentDidMount () {
        let mrktQuotes = {
            'MSFT': 261.15, 'AAPL': 134.32, 'AMZN':3340.88, 'NFLX':505.55, 
            'FB':301.13, 'SNAP': 61.30, 'GOOG':2315.30, 'WMT':139.90, 
            'BP':24.52, 'TSLA': 729.40, 'DELL':101.41,'SPOT': 284.11, 
            'TWTR':67.02, 'HPQ':34.42, 'EBAY':60.91, 'RACE':215.90}
        this.setState({quotes:mrktQuotes})
    }

    handleAddShare(e) {
        let ticker = e.target.attributes.value.nodeValue;
        // check if state.quants object has ticker key
        if (this.state.quants[ticker]) {
            this.setState(prevState => ({
                quants: {                   // object that we want to update
                    ...prevState.quants,    // keep all other key-value pairs
                    [ticker]: this.state.quants[ticker] + 1       // update the value of specific key
                }
            }))
        } else {
            this.setState(prevState => ({
                quants: {                   
                    ...prevState.quants,    
                    [ticker]:  1       
                }
            }))
        }
    }

    handleRemoveShare(e) {
        let ticker = e.target.attributes.value.nodeValue;
        // check if state.quants object has ticker key
        if (this.state.quants[ticker]) {
            if (this.state.quants[ticker]>0)
            this.setState(prevState => ({
                quants: {                   
                    ...prevState.quants,    
                    [ticker]:  this.state.quants[ticker] - 1    
                }
            }))
        }
    }

    calcPortfolio() {
        let nonZeroQuants = Object.entries(this.state.quants).filter(elem => (elem[1]>0));
        let totalPortfolio = 0;
        for (let i = 0; i < nonZeroQuants.length; i++) {
            totalPortfolio+=nonZeroQuants[i][1] * this.state.quotes[nonZeroQuants[i][0]]
        }
        return Number.parseFloat(totalPortfolio).toFixed(2)
    }

    render () {
        return (
        <div className="Main">
            <h1>Investment Portfolio ${this.calcPortfolio()}</h1>
            <div className='tickers'>
                <TickerWindow ticker='MSFT' price={this.state.quotes.MSFT} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.MSFT ? this.state.quants.MSFT : 0 }/>
                <TickerWindow ticker='AAPL' price={this.state.quotes.AAPL} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.AAPL ? this.state.quants.AAPL : 0 }/>
                <TickerWindow ticker='AMZN' price={this.state.quotes.AMZN} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.AMZN ? this.state.quants.AMZN : 0 }/>
                <TickerWindow ticker='NFLX' price={this.state.quotes.NFLX} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.NFLX ? this.state.quants.NFLX : 0 }/>
                <TickerWindow ticker='FB'   price={this.state.quotes.FB}   onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.FB ? this.state.quants.FB : 0 }/>
                <TickerWindow ticker='SNAP' price={this.state.quotes.SNAP} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.SNAP ? this.state.quants.SNAP : 0 }/>
                <TickerWindow ticker='GOOG' price={this.state.quotes.GOOG} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.GOOG ? this.state.quants.GOOG : 0 }/>
                <TickerWindow ticker='WMT'  price={this.state.quotes.WMT}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.WMT ? this.state.quants.WMT : 0 }/>
                <TickerWindow ticker='BP'   price={this.state.quotes.BP}   onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.BP ? this.state.quants.BP : 0 }/>
                <TickerWindow ticker='TSLA' price={this.state.quotes.TSLA} onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.TSLA ? this.state.quants.TSLA : 0 }/>
                <TickerWindow ticker='DELL' price={this.state.quotes.DELL}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.DELL ? this.state.quants.DELL : 0 }/>
                <TickerWindow ticker='SPOT' price={this.state.quotes.SPOT}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.SPOT ? this.state.quants.SPOT : 0 }/>
                <TickerWindow ticker='TWTR' price={this.state.quotes.TWTR}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.TWTR ? this.state.quants.TWTR : 0 }/>
                <TickerWindow ticker='HPQ'  price={this.state.quotes.HPQ}   onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.HPQ ? this.state.quants.HPQ : 0 }/>
                <TickerWindow ticker='EBAY' price={this.state.quotes.EBAY}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.EBAY ? this.state.quants.EBAY : 0 }/>
                <TickerWindow ticker='RACE' price={this.state.quotes.RACE}  onAdd={this.handleAddShare} onRemove={this.handleRemoveShare} qty={this.state.quants.RACE ? this.state.quants.RACE : 0 }/>
            </div>
        </div>
        )
    }
}

export default MainPage;


