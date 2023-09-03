import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddCourseDialog from "../Modals/AddCourseDialog";
import EditCourseDialog from "../Modals/EditCourseDialog";
import {
  getCourses,
  deleteCourse,
  getCourseDetail,
} from "../Services/CourseService";
import "../css/courses.css";

function CoursesComponent() {
  const userId = localStorage.getItem("userId");
  const [listCourse, setListCourse] = useState([]);
  const [isDialog, setIsDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(false);
  const [course, setCourse] = useState([]);
  const handleOpenDialog = () => {
    setIsDialog(true);
  };

  const handleCloseDialog = () => {
    setIsDialog(false);
    setIsEdit(false);
  };

  const handleDeleteCourse = (data) => {
    deleteCourse((res) => {
      if (res.statusCode === 200) {
        getCourses((res) => {
          setListCourse(res.data);
        });
      }
    }, data.id);
  };

  const handleEditCourse = (data) => {
    setCourse(data.row);

    setIsEdit(true);
  };
  const handleGetCourse = () => {
    getCourses((res) => {
      setListCourse(res.data);
    });
  };

  useEffect(() => {
    handleGetCourse();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Course Name",
      width: 350,
      editable: true,
    },
    {
      field: "code",
      headerName: "Code",
      width: 100,
      editable: true,
    },
    {
      field: "popup",
      headerName: "Popup",
      width: 100,
      editable: true,
    },
    {
      field: "blocks",
      headerName: "Time Ask Mentor",
      width: 100,
      editable: true,
    },
    {
      field: "id",
      headerName: "Handle",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => handleEditCourse(params)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCourse(params)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="user">
      <div className="user-header">
        <h5>Course List</h5>
        <button className="btn btn-success" onClick={handleOpenDialog}>
          Add Course
        </button>
      </div>
      <div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={listCourse}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
      {isDialog && (
        <AddCourseDialog
          open={isDialog}
          handleClose={handleCloseDialog}
          getUsers={handleGetCourse}
        />
      )}
      {isEdit && (
        <EditCourseDialog
          open={isEdit}
          course={course}
          handleClose={handleCloseDialog}
          getUsers={handleGetCourse}
        />
      )}
    </div>
  );
}

export default CoursesComponent;
