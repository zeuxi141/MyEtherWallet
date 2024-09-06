import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';

  // Function to shorten address or hash
  const shortenString = (str) => {
    return `${str.slice(0, 11)}...${str.slice(-4)}`;
  };

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Component
export default function TransactionHistory({ address }) {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const apiKey = '1KVYGEHX8JQNANF8HXUHV7PXIJIT9PFQEX'; // Thay bằng API Key của bạn
        const sepoliaApiUrl = `https://api-sepolia.etherscan.io/api`;

        const response = await axios.get(sepoliaApiUrl, {
          params: {
            module: "account",
            action: "txlist",
            address: address,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 10,
            sort: "desc",
            apikey: apiKey,
          },
        });

        if (response.data.status === "1") {
          setTransactions(response.data.result);
        } else {
          setError("Error fetching transaction history");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [address]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="transaction history">
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction Hash</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            <StyledTableCell align="right">Value (ETH)</StyledTableCell>
            <StyledTableCell align="right">Gas Used</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <StyledTableRow key={tx.hash}>
              <StyledTableCell component="th" scope="row">
                <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                  {shortenString(tx.hash)}
                </a>
              </StyledTableCell>
              <StyledTableCell align="right"><div>{shortenString(tx.from)}</div></StyledTableCell>
              <StyledTableCell align="right">{shortenString(tx.to)}</StyledTableCell>
              <StyledTableCell align="right">{(tx.value / 10 ** 18).toFixed(6)}</StyledTableCell>
              <StyledTableCell align="right">{tx.gasUsed}</StyledTableCell>
              <StyledTableCell align="right">{tx.txreceipt_status === "1" ? "Success" : "Failed"}</StyledTableCell>
              <StyledTableCell align="right">{new Date(tx.timeStamp * 1000).toLocaleDateString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}