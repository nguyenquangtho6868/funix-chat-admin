import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { editUser } from "../Services/LoginService";
import { getCourses } from "../Services/CourseService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

export default function EditUserDialog(props) {
  const [listCourse, setListCourse] = useState([
    "DBI202X",
    "NJS101X",
    "NJS301X",
    "PRF192X",
    "PRM391X",
    "RJS301X",
    "WEB101X",
  ]);
  console.log(props.data.username);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, courses, theme) {
    return {
      fontWeight:
        courses.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      username: props.data.username,
      email: props.data.email,
      role: props.data.role,
      courses: props.data.courses,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Tối thiểu 6 ký tự")
        .required("Trường này là băt buộc!"),
      email: Yup.string()
        .min(6, "Tối thiểu 6 ký tự")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Bạn chưa nhập đúng định dạng email!"
        )
        .required("Trường này là băt buộc!"),
      role: Yup.string().required("Trường này là băt buộc!"),
      courses: Yup.array().min(1, "Trường này là băt buộc!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      props.handleClose();

      let data = {
        username: values.username,
        role: values.role,
        courses: values.courses,
        email: values.email,
        id: props.data._id,
      };

      editUser((res) => {
        if (res.statusCode === 200) {
          toast.success("Edit thành công!", { className: "toast-message" });
          setSubmitting(false);
          resetForm();
          props.getUsers();
        } else {
          if (res.message) {
            toast.error(res.message, { className: "toast-message" });
          } else {
            toast.error("Có lỗi trong quá trình xử lý!", {
              className: "toast-message",
            });
          }
        }
      }, data);
    },
  });

  useEffect(() => {
    getCourses((rs) => {
      console.log(rs);
      if (rs.statusCode === 200 && rs.data.length > 0) {
        setListCourse(rs.data);
      }
    });
  }, []);

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            variant="standard"
            style={{ minWidth: "30rem" }}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username && (
            <div className="form-error mt-2">{formik.errors.username}</div>
          )}
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            style={{ minWidth: "30rem" }}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="form-error mt-2">{formik.errors.email}</div>
          )}
        </DialogContent>

        <DialogContent>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formik.values.role}
              onChange={formik.handleChange}
              label="Role"
              name="role"
            >
              <MenuItem value="">
                <em>courses</em>
              </MenuItem>
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              <MenuItem value={"MENTOR"}>MENTOR</MenuItem>
              <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
            </Select>
          </FormControl>
          {formik.errors.role && formik.touched.role && (
            <div className="form-error mt-2">{formik.errors.role}</div>
          )}
        </DialogContent>

        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Courese</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              name="courses"
              value={formik.values.courses}
              onChange={formik.handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, key) => (
                    <Chip key={key} label={value.code} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {listCourse.length > 0 &&
                listCourse.map((course, key) => (
                  <MenuItem
                    key={key}
                    value={course}
                    style={getStyles(course, formik.values.courses, theme)}
                  >
                    {course.code}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {formik.errors.courses && formik.touched.courses && (
            <div className="form-error mt-2">{formik.errors.courses}</div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
