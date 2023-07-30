import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { addCourse } from "../Services/CourseService";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddCourseDialog(props) {
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

  const names = [
    "DBI202X",
    "NJS101X",
    "NJS301X",
    "PRF192X",
    "PRM391X",
    "RJS301X",
    "WEB101X",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, "Tối thiểu 6 ký tự")
        .required("Trường này là băt buộc!"),
      code: Yup.string().required("Trường này là băt buộc!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      props.handleClose();
      let data = {
        name: values.name,
        code: values.code,
      };
      addCourse((res) => {
        if (res.statusCode === 200) {
          toast.success("Thêm mới thành công!", { className: "toast-message" });
          setSubmitting(false);
          resetForm();
          props.getUsers();
        } else {
          toast.error("Có lỗi trong quá trình xử lý!", {
            className: "toast-message",
          });
        }
      }, data);
    },
  });

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            style={{ minWidth: "30rem" }}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="form-error mt-2">{formik.errors.name}</div>
          )}
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Code Course"
            type="code"
            name="code"
            fullWidth
            variant="standard"
            style={{ minWidth: "30rem" }}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          {formik.errors.code && formik.touched.code && (
            <div className="form-error mt-2">{formik.errors.code}</div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
