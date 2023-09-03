import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "../css/history.css";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import { dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getRoomChats } from "../Services/RoomChat";
import { API_URL } from "../Constant/ApiConstant";
// function createData(email, code, start, end, rate, status, room_id) {
//   return { email, code, start, end, rate, status, room_id };
// }

function HistoryComponent() {
  const theme = useTheme();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [listHistory, setListHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mentor, setMentor] = useState("");
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  function createData(
    emailMentor,
    emailStudent,
    subject,
    start,
    accept,
    question,
    help,
    end,
    rate,
    status,
    blocks,
    type,
    room_id
  ) {
    return {
      emailMentor,
      emailStudent,
      subject,
      start,
      accept,
      question,
      help,
      end,
      rate,
      status,
      blocks,
      type,
      room_id,
    };
  }
  const columns = [
    { id: "emailMentor", label: "mentor", minWidth: 70 },
    { id: "emailStudent", label: "xTer", minWidth: 70 },
    { id: "subject", label: "Code Course", minWidth: 20 },
    {
      id: "start",
      label: "Start Date",
      minWidth: 50,
      align: "right",
    },
    {
      id: "accept",
      label: "Accepted date",
      minWidth: 50,
      align: "right",
    },
    {
      id: "question",
      label: "Questions",
      minWidth: 10,
      align: "right",
    },
    {
      id: "help",
      label: "HelpFul",
      minWidth: 10,
      align: "right",
    },
    {
      id: "end",
      label: "End Date",
      minWidth: 50,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "blocks",
      label: "Block",
      minWidth: 10,
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 30,
      align: "right",
    },
    {
      id: "rate",
      label: "Rating",
      minWidth: 10,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "type",
      label: "Type",
      minWidth: 30,
      align: "right",
    },
  ];
  const rows = [createData("India", "IN", "03/05/2022", "04/06/2023")];
  useEffect(() => {
    getRoomChats((res) => {
      if (res.statusCode === 200) {
        console.log(res.data);
        const dataToRow = res.data?.map((obj) => {
          return createData(
            obj.users[1]?.email,
            obj.users[0]?.email,
            obj.courses?.code,
            obj.start_date,
            obj.accepted_date,
            obj.questions,
            obj.helpFul ? "YES" : "NO",
            obj.end_date,
            obj.rate,
            obj.status,
            obj.blocks,
            obj.type,
            obj._id
          );
        });

        setListHistory(dataToRow);
      }
    });
  }, []);

  const handleMentor = (e) => {
    e.preventDefault();
    setMentor(e.target.value);
  };
  const handleStudent = (e) => {
    e.preventDefault();
    setStudent(e.target.value);
  };
  const handleSubject = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };
  const handleFrom = (e) => {
    //console.log(dayjs(e.$d).format("D/MM/YYYY"));
    setFrom(dayjs(e.$d)?.format("D/MM/YYYY"));
  };
  const handleTo = (e) => {
    // console.log(e);
    setTo(dayjs(e.$d).format("DD/MM/YYYY"));
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const hanleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleFilter = () => {
    console.log({ mentor });
    console.log({ student });
    console.log({ subject });
    console.log({ from });
    console.log({ to });
    console.log({ status });
    const dat = `?mentor=${mentor}&xter=${student}&code=${subject}&from=${from}&to=${to}&status=${status}`;
    function getFilterRoom() {
      const token = localStorage.getItem("token");
      fetch(
        // `${API_URL}/get-fiter-room-chat?mentor=${mentor}&xter=${xter}&code=${code}&from=${from}&to=${to}`,
        `${API_URL}/get-fiter-room-chat${dat}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          const dataToRow = json.data.map((obj) => {
            return createData(
              obj.users[1]?.email,
              obj.users[0]?.email,
              obj.courses?.code,
              obj.start_date,
              obj.accepted_date,
              obj.questions,
              obj.helpFul ? "YES" : "NO",
              obj.end_date,
              obj.rate,
              obj.status,
              obj.blocks,
              obj.type,
              obj._id
            );
          });

          setListHistory(dataToRow);
        });
    }
    getFilterRoom();
  };
  const handleChangeRowsPerPage = (event) => {
    console.log(event);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const moveToGroupChat = (id) => {
    navigate(`/view-chat-history/${id}`);
  };

  return (
    <Grid container className="history">
      <Grid xs={12} item mb={2}>
        <Grid container className="history-filter">
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            className="text-center-flex history-filter-item"
          >
            <TextField
              id="outlined-basic"
              label="Mentor"
              variant="outlined"
              className="history-filter-item-text history-email"
              value={mentor}
              onChange={(newValue) => handleMentor(newValue)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            lg={2}
            className="text-center-flex history-filter"
          >
            <TextField
              id="outlined-basic"
              label="Student Code"
              variant="outlined"
              className="history-filter-item-text"
              value={student}
              onChange={(newValue) => handleStudent(newValue)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            lg={2}
            className="text-center-flex history-filter"
          >
            <TextField
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              className="history-filter-item-text"
              value={subject}
              onChange={(newValue) => handleSubject(newValue)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            className="text-center-flex history-filter-date history-filter"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="history-filter-item-text"
                label="From"
                //value={from}
                onChange={(newValue) => handleFrom(newValue)}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            className="text-center-flex history-filter"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="history-filter-item-text"
                label="To"
                //value={to}
                onChange={(newValue) => handleTo(newValue)}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            className="text-center-flex history-filter"
          >
            <select onChange={(e) => hanleStatus(e)}>
              <option value="">ALL</option>
              <option value="Opened">Opened</option>
              <option value="Closed">Closed</option>
              <option value="Cancelled">Cencalled</option>
              <option value="Wating">Wating</option>
              <option value="Replying">Replying</option>
              <option value="Replied">Replied</option>
            </select>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={2}
            className="history-btn text-center-flex history-filter"
          >
            <Button className="history-btn-filter" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column._id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listHistory.length > 0 &&
                  listHistory
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          onClick={() => moveToGroupChat(row.room_id)}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page || 0}
            onPageChange={(e, value) => handleChangePage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HistoryComponent;
