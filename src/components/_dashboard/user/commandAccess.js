import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from '@material-ui/core';
// utils
import usePoliceData from '../../../db/usePoliceData';
import CommandAccessMoreMenu from './list/CommandAccessMoreMenu';

// ----------------------------------------------------------------------

CommandAccess.propTypes = {
  commandAccess: PropTypes.object,
  officerFormationOptions: PropTypes.object,
  setCommandAccess: PropTypes.func,
  getCommandDetails: PropTypes.func
};

export default function CommandAccess({
  commandAccess,
  setCommandAccess,
  getCommandDetails,
  officerFormationOptions,
  isEdit
}) {
  console.log('setCommandAccess', commandAccess, isEdit);
  const [policeData, setpoliceData] = useState([]);
  const [department, setdepartment] = useState([]);
  const [officerSection, setofficerSection] = useState([]);
  const [officerSubSection, setofficerSubSection] = useState([]);

  const [formationCode, setFormationCode] = useState({});
  const [departmentCode, setdepartmentCode] = useState({});
  const [sectionCode, setSectionCode] = useState({});
  const [subSectionCode, setSubSectionCode] = useState({});
  const [commandAccessArray, setCommandAccessArray] = useState([]);
  const [commandAccessIds, setCommandAccessIds] = useState([]);

  const handleChange = async (val, setFieldValue, fieldName, data, next) => {
    const res = await getCommandDetails(val);
    next(res.data.data);
    // console.log(data, fieldName);
    let fValues = [];
    if (data.sub) {
      fValues = data.sub.map((v) => v.Name);
    } else {
      fValues = data.map((v) => v.name);
    }
    const index = fValues.indexOf(val);
    console.log(val, index);
    console.log(data);
    if (!Array.isArray(data)) {
      console.log(val, data?.sub[index]);
      if (val === data?.sub[index].Name) {
        console.log(data.sub[index], 'FOUND');
        next(data.sub[index]);
      }
    }
    // console.log(val, data, data.Name, data.name);
    // console.log(fValues.indexOf(val));
    setFieldValue(fieldName, val);
    if (val === data[index]?.name) {
      console.log(data[index].sub);
      next(data[index]);
      // setofficerSection(policeData[index].sub);
    } else if (val === data[index]?.Name) {
      console.log(data[index].sub);
      // next(data[index]);
      // setofficerSection(policeData[index].sub);
    }
  };
  // if (error) {
  //   console.log(error);
  // }
  // useEffect(() => {
  //   if (response?.data) {
  //     console.log(response?.data);
  //     setpoliceData(response.data.data);
  //   }
  // }, [response]);

  const NewUserSchema = Yup.object().shape({
    officerFormation: Yup.mixed().required('Officer Formation is required'),
    officerDepartment: Yup.mixed().required('Officer Deptartment is required'),
    officerSection: Yup.mixed().required('Officer Section is required')
  });

  const [isAccessEdit, setAccessEdit] = useState(false);

  const addCommand = (val, resetForm) => {
    console.log(formationCode);
    const values = {
      officerFormation: formationCode,
      officerDepartment: departmentCode,
      officerSection: sectionCode,
      officerSubSection: subSectionCode
    };
    const ids = {
      officerFormation: `${formationCode.code}`,
      officerDepartment: departmentCode.code,
      officerSection: sectionCode.code,
      officerSubSection: subSectionCode.code || ''
    };
    if (isAccessEdit) {
      const objIndex = commandAccessArray.findIndex((obj) => obj.officerFormation === formationCode);
      commandAccessArray[objIndex].officerDepartment = departmentCode;
      commandAccessArray[objIndex].officerSection = sectionCode;
      commandAccessArray[objIndex].officerSubSection = subSectionCode;

      commandAccessIds[objIndex].officerDepartment = departmentCode.code;
      commandAccessIds[objIndex].officerSection = sectionCode.code;
      commandAccessIds[objIndex].officerSubSection = subSectionCode.code || '';
      setCommandAccessArray(commandAccessArray);
      setCommandAccessIds(commandAccessIds);
      setCommandAccess('commandAccessIds', commandAccessIds);
      setAccessEdit(false);
    } else if (commandAccessArray.length > 0) {
      setCommandAccessArray([...commandAccessArray, values]);
      setCommandAccessIds([...commandAccessIds, ids]);
      setCommandAccess('commandAccessIds', [...commandAccessIds, ids]);
    } else {
      setCommandAccessArray([values]);
      setCommandAccessIds([ids]);
      setCommandAccess('commandAccessIds', [ids]);
    }
    setFormationCode({});
    setdepartmentCode({});
    setSectionCode({});
    setSubSectionCode({});
  };
  const editField = (field) => {
    setAccessEdit(true);
    setFormationCode(field.officerFormation);
    setdepartmentCode(field.officerDepartment);
    setSectionCode(field.officerSection);
    setSubSectionCode(field.officerSubSection);
  };

  const deleteField = (index) => {
    const filter = commandAccessArray.filter((val, idx) => index !== idx);
    console.log(filter);
    setCommandAccessArray(filter);
    setCommandAccess('commandAccess', filter);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      officerFormation: '',
      officerDepartment: '',
      officerSection: '',
      officerSubSection: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // setCommandAccess(values);
        console.log('values access', values);
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps, resetForm } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box sx={{ pb: 3 }}>
                  Command Access Details (<small>These are the commands that the user has access to</small>)
                </Box>
                <Stack sx={{ pb: 3 }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Formation"
                    placeholder="officerFormation"
                    {...getFieldProps('officerFormation')}
                    onChange={(evt) => {
                      setFormationCode(JSON.parse(evt.target.value));
                      handleChange(
                        [JSON.parse(evt.target.value).code],
                        setFieldValue,
                        'officerFormation',
                        policeData,
                        setdepartment
                      );
                    }}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerFormation && errors.officerFormation)}
                    helperText={touched.officerFormation && errors.officerFormation}
                    value={JSON.stringify(formationCode)}
                  >
                    <option value="" />
                    {officerFormationOptions?.map((option) => (
                      <MenuItem key={option.name} value={JSON.stringify({ code: option.code, name: `${option.name}` })}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Department"
                    placeholder="officerDepartment"
                    {...getFieldProps('officerDepartment')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      setdepartmentCode(JSON.parse(evt.target.value));
                      handleChange(
                        [formationCode.code, JSON.parse(evt.target.value).code],
                        setFieldValue,
                        'officerDepartment',
                        department,
                        setofficerSection
                      );
                    }}
                    error={Boolean(touched.officerDepartment && errors.officerDepartment)}
                    helperText={touched.officerDepartment && errors.officerDepartment}
                    value={JSON.stringify(departmentCode)}
                  >
                    <MenuItem value="" />
                    {department &&
                      department?.map((option) => (
                        <MenuItem
                          key={option.Code}
                          value={JSON.stringify({ code: option.Code, name: `${option.Name} ${option.Address}` })}
                        >
                          {`${option.Name} ${option.Address}`}
                        </MenuItem>
                      ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Section"
                    placeholder="Officer Section"
                    {...getFieldProps('officerSection')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      setSectionCode(JSON.parse(evt.target.value));
                      handleChange(
                        [formationCode.code, departmentCode.code, JSON.parse(evt.target.value).code],
                        setFieldValue,
                        'officerSection',
                        officerSection,
                        setofficerSubSection
                      );
                    }}
                    error={Boolean(touched.officerSection && errors.officerSection)}
                    helperText={touched.officerSection && errors.officerSection}
                    value={JSON.stringify(sectionCode)}
                  >
                    <MenuItem value="" />
                    {officerSection &&
                      officerSection?.map((option) => (
                        <MenuItem
                          key={option.Code}
                          value={JSON.stringify({ code: option.Code, name: `${option.Name} ${option.Address}` })}
                        >
                          {option.Name} {option.Address}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Sub Section"
                    placeholder="Officer Sub Section"
                    {...getFieldProps('officerSubSection')}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerSubSection && errors.officerSubSection)}
                    helperText={touched.officerSubSection && errors.officerSubSection}
                    value={JSON.stringify(subSectionCode)}
                    onChange={(evt) => {
                      setSubSectionCode(JSON.parse(evt.target.value));
                    }}
                  >
                    <MenuItem value="" />
                    {officerSubSection?.map((option) => (
                      <MenuItem key={option.Code} value={JSON.stringify({ code: option.Code, name: option.name })}>
                        {option.Name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>
              <Button
                size="large"
                // type="button"
                onClick={() => addCommand(values, resetForm)}
                variant="contained"
                loading={isSubmitting}
                sx={{ mt: 5, mb: 3 }}
              >
                {isAccessEdit ? 'Update Command Access' : 'Add Command Access'}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Form>
      {commandAccessArray.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item>
            <Card sx={{ p: 2, pb: 5, margin: '10px 0' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Officer Formation</TableCell>
                      <TableCell>Officer Department</TableCell>
                      <TableCell>Officer Section</TableCell>
                      <TableCell>Officer SubSection</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commandAccessArray.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.officerFormation.name}</TableCell>
                        <TableCell>{row.officerDepartment.name}</TableCell>
                        <TableCell>{row.officerSection.name}</TableCell>
                        <TableCell>{row.officerSubSection.name}</TableCell>
                        <TableCell>
                          <CommandAccessMoreMenu onDelete={() => deleteField(index)} onEdit={() => editField(row)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </FormikProvider>
  );
}
