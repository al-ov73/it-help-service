import { FormikProvider, useFormik } from "formik";
import routes from "../routes/routes";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const TicketCreateForm = ({user}) => {
  const handleSubmit = async (values) => {
    const title = values.title;
    const description = values.description;
    const priority = values.priority;
    const type = values.type;
    try {
      const { tokens } = JSON.parse(localStorage.getItem('user'))
      const requestBody = {
        title,
        description,
        priority,
        type,
        author: user.id,
      };
      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        }
      }
      const response = await axios.post(routes.ticketsPath, requestBody, requestHeaders);
      console.log('submit response', response)
    } catch (e) {
      console.log('TicketCreateForm error', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: '',
      type: '',
    },
    onSubmit: (values) => handleSubmit(values),
  });

  return <>
  <FormikProvider value={formik}>
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Опишите вашу проблему</h1>

      <Form.Group className="form-floating mb-3">
      <Form.Control
        autoComplete="title"
        id="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        />
      <Form.Label htmlFor='title' >title</Form.Label>
      </Form.Group>

      <Form.Group className="form-floating mb-3">
      <Form.Control
        autoComplete="description"
        id="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        />
      <Form.Label htmlFor='description' >description</Form.Label>
      </Form.Group>

      <Form.Select aria-label="priority"
              autoComplete="priority"
              id="priority"
              onChange={formik.handleChange}
              value={formik.values.priority}>
        <option>priority</option>
        <option value="LOW">Низкий</option>
        <option value="HIGH">Высокий</option>
      </Form.Select>

      <Form.Select aria-label="type"
                    autoComplete="type"
                    id="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}>
        <option>Тип проблемы</option>
        <option value="SOFT">Software</option>
        <option value="HARD">Hardware</option>
        <option value="OTHER">Other</option>
      </Form.Select>

      <Button type="submit">Отправить тикет</Button>
    </Form>
  </FormikProvider>
  </>
}


export default TicketCreateForm;