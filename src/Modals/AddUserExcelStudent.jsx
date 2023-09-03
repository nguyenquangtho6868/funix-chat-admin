import { useState } from "react";
import "../css/excel.css";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

import * as XLSX from "xlsx";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { addUser } from "../Services/LoginService";

export default function AddUserExcelStudent({ handleClose, handleGet }) {
  const [excelFile, setExcelFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [subCon, setSubCon] = useState(false);
  const [requestFalse, setRequestFalse] = useState([]);
  const [requestTrue, setRequestTrue] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [convert, setConvert] = useState([]);

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    console.log(selectedFile.name);
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = (e) => {
      setExcelFile(e.target.result);
    };
    console.log(reader);
  };
  // submit function
  console.log(excelFile);
  const handleSubmit = (e) => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      setSubmit(true);
    } else {
      setExcelData(null);
    }
  };

  const handleConvert = () => {
    setConvert(
      excelData
        ? excelData.map((e) => {
            return {
              username: e["Student Name"],
              courses: { name: "mặc định", code: e["Subject"] },
              role: "STUDENT",
              email: e["Account LMS"],
            };
          })
        : null
    );
    setSubmit(false);
    setSubCon(true);
  };

  const mergedData = convert.reduce((result, item) => {
    const existingItem = result.find((i) => i.email === item.email);
    if (existingItem) {
      existingItem.courses.push(item.courses);
    } else {
      result.push({
        username: item.username,
        email: item.email,
        role: "STUDENT",
        courses: [item.courses],
      });
    }
    return result;
  }, []);

  console.log(mergedData);

  const handleRequest = () => {
    Promise.all(
      mergedData.map((con) =>
        addUser((res) => {
          if (res.statusCode === 200) {
            setRequestTrue((pre) => [...pre, { ...con, type: "thanhcong" }]);
            toast.success("Thêm mới thành công!", {
              className: "toast-message",
            });
          } else {
            setRequestFalse((pre) => [...pre, { ...con, type: "thatbai" }]);
            if (res.message) {
              toast.error(res.message, { className: "toast-message" });
            } else {
              toast.error("Có lỗi trong quá trình xử lý!", {
                className: "toast-message",
              });
            }
          }
        }, con)
      )
    );
    setSubmit(false);
    setSubCon(false);
    handleGet();
  };
  console.log(requestFalse);
  const columns = [
    {
      field: "username",
      headerName: "User Name",
      width: 350,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: true,
    },

    {
      field: "courses",
      headerName: "Courses",
      width: 200,
      editable: true,
      renderCell: (params) => <li> {params.value.code}</li>,
    },
  ];
  return (
    <div className="excel">
      <h1>EXCEL STUDENT</h1>
      <div className="container">
        {/* upload file section */}
        <div className="form">
          <div className="form-group" autoComplete="off">
            <label>
              <h5>Upload Excel file</h5>
            </label>
            <br></br>
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
              required
            ></input>

            <button
              disabled={submit || subCon}
              onClick={handleSubmit}
              className="btn btn-success"
              style={{ marginTop: 5 + "px" }}
            >
              Submit
            </button>

            <button
              disabled={!submit}
              onClick={handleConvert}
              className="btn btn-success"
              style={{ marginTop: 5 + "px" }}
            >
              Convert
            </button>

            <button
              disabled={submit || !subCon}
              onClick={handleRequest}
              className="btn btn-success"
              style={{ marginTop: 5 + "px" }}
            >
              Request
            </button>
          </div>
        </div>
      </div>
      {!submit && subCon && (
        <div>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={convert}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.email}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              className="responsive-data-grid"
            />
          </Box>
        </div>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
      {requestFalse.map((res) => {
        return (
          <div>
            <p>{res.username}</p>
            <p>{res.email}</p>
            <p style={{ backgroundColor: "red" }}>{res.type}</p>
          </div>
        );
      })}
      {requestTrue.map((res, index) => {
        return (
          <div key={index}>
            <p>{res.username}</p>
            <p>{res.email}</p>
            <p style={{ backgroundColor: "green" }}>{res.type}</p>
          </div>
        );
      })}
    </div>
  );
}
