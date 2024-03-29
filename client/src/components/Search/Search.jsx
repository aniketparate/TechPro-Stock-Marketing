import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { TextField, Container, Grid, Card } from '@material-ui/core/'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from '../Template/LineChart'
import styles from './Search.module.css'
import Axios from 'axios'
import InfoCard from './InfoCard'
import PriceCard from './PriceCard'
import PurchaseCard from './PurchaseCard'
import PurchaseModal from './PurchaseModal'

const filter = createFilterOptions()

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginBottom: '40px',
  },
}))

const LineChartCard = ({ pastDataPeriod, stockInfo, duration }) => {
  return (
    <Grid
      item
      xs={12}
      sm={7}
      component={Card}
      className={styles.card}
      style={{ minHeight: '350px' }}
    >
      <LineChart
        pastDataPeriod={pastDataPeriod}
        stockInfo={stockInfo}
        duration={duration}
      />
    </Grid>
  )
}

const StockCard = ({ setPurchasedStocks, purchasedStocks, currentStock }) => {
  const { userData } = useContext(UserContext)
  const [selected, setSelected] = useState(false)
  const [stockInfo, setStockInfo] = useState(undefined)
  const [sixMonthAverages, setSixMonthAverages] = useState(undefined)
  const [pastDay, setPastDay] = useState(undefined)
  const [pastMonth, setPastMonth] = useState(undefined)
  const [pastTwoYears, setPastTwoYears] = useState(undefined)

  useEffect(() => {
    const getInfo = async () => {
      const url = `/api/data/prices/${currentStock.ticker}`
      const response = await Axios.get(url)
      if (response.data.status === 'success') {
        setStockInfo(response.data.data)
      }
    }

    getInfo()

    const getData = async () => {
      const url = `/api/data/prices/${currentStock.ticker}/full`
      const response = await Axios.get(url)
      if (response.data.status === 'success') {
        setSixMonthAverages(response.data.sixMonthAverages)
        setPastDay(response.data.pastDay)
        setPastMonth(response.data.pastMonth)
        setPastTwoYears(response.data.pastTwoYears)
      }
    }

    getData()
  }, [])

  return (
    <div className={styles.root}>
      {stockInfo && pastDay && (
        <InfoCard stockInfo={stockInfo} price={pastDay.adjClose} />
      )}
      {sixMonthAverages && pastDay && pastMonth && pastTwoYears && (
        <div>
          <Grid container spacing={3}>
            <LineChartCard
              pastDataPeriod={pastTwoYears}
              stockInfo={stockInfo}
              duration={'2 years'}
            />
          </Grid>
          <PriceCard pastDay={pastDay} />
          <Grid container spacing={3}>
            <PurchaseCard
              setSelected={setSelected}
              balance={userData.user.balance}
            />
          </Grid>
          {selected && (
            <PurchaseModal
              stockInfo={stockInfo}
              pastDay={pastDay}
              setSelected={setSelected}
              setPurchasedStocks={setPurchasedStocks}
              purchasedStocks={purchasedStocks}
            />
          )}
        </div>
      )}
    </div>
  )
}

const Search = ({ setPurchasedStocks, purchasedStocks }) => {
  const classes = useStyles()
  const [value, setValue] = useState(null)
  const [currentStock, setCurrentStock] = useState(null)

  const onSearchChange = (event, newValue) => {
    setValue(newValue)
    if (newValue) {
      setCurrentStock(newValue)
    } else {
      setCurrentStock(null)
    }
  }

  return (
    <Container className={classes.addMargin}>
      <Autocomplete
        value={value}
        onChange={onSearchChange}
        filterOptions={(options, params) => {
          let filtered = filter(options, params)
          if (currentStock) {
            filtered = filtered.slice(0, 4)
          }
          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="stock-search-bar"
        options={stocks}
        getOptionLabel={(option) => {
          return option.name
        }}
        renderOption={(option) => option.name}
        style={{
          maxWidth: '700px',
          margin: '30px auto',
          marginBottom: '60px',
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a stock"
            variant="outlined"
          />
        )}
      />
      {currentStock && (
        <StockCard
          setPurchasedStocks={setPurchasedStocks}
          purchasedStocks={purchasedStocks}
          currentStock={currentStock}
        />
      )}
      <br />
      <br />
      <br />
    </Container>
  )
}

const stocks = [
  { name: 'Apple', ticker: 'AAPL' },
  { name: 'Amazon', ticker: 'AMZN' },
  { name: 'Google', ticker: 'GOOG' },
  { name: 'Microsoft', ticker: 'MSFT' },
  { name: 'Intel', ticker: 'INTC' },
  { name: 'IBM', ticker: 'IBM' },
]

export default Search
