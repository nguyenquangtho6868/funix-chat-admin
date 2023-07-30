import { useState } from "react";
import "../css/excel.css";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as XLSX from "xlsx";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { addUser } from "../Services/LoginService";

export default function AddUserExcel({ handleClose, handleGet }) {
  const [excelFile, setExcelFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [subCon, setSubCon] = useState(false);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [convert, setConvert] = useState([]);
  const fileType = ["application/vnd.ms-excel"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
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
  console.log(excelData);

  const handleConvert = () => {
    setConvert(
      excelData
        ? excelData.map((e) => {
            return {
              username: e.username,
              courses: e.courses.split(" , ").map((objStr) => {
                const obj = {};
                const keyValuePairs = objStr.split(" ");

                keyValuePairs.forEach((pair) => {
                  const [key, value] = pair.split(":");
                  obj[key] = value;
                });

                return obj;
              }),
              role: e.role,
              email: e.email,
            };
          })
        : null
    );
    setSubmit(false);
    setSubCon(true);
  };

  const handleRequest = () => {
    Promise.all(
      convert.map((con) =>
        addUser((res) => {
          if (res.statusCode === 200) {
            toast.success("Thêm mới thành công!", {
              className: "toast-message",
            });
          } else {
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
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((item, key) => {
              return <span key={key}> {item.code + ","}</span>;
            })}
          </div>
        );
      },
    },
  ];
  return (
    <div className="excel">
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
    </div>
  );
}
