import { FormikProvider, useFormik } from "formik";
import routes from "../routes/routes";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Container from "react-bootstrap/esm/Container";

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
  <h1 className="text-center mb-4">Описание проблемы</h1>
    <Form onSubmit={formik.handleSubmit} className="justify-content-md-center">
      <Container>
      <Row>
        <Col>
        <Form.Group className="form-floating mb-3">
        <Form.Control
          // autoComplete="title"
          id="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        />
        <Form.Label htmlFor='title' >Проблема кратко</Form.Label>
        </Form.Group>
        </Col>
        <Col>
        <Form.Select aria-label="priority"
                // autoComplete="priority"
                id="priority"
                onChange={formik.handleChange}
                value={formik.values.priority}>
          <option>Приоритет</option>
          <option value="LOW">Низкий</option>
          <option value="HIGH">Высокий</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select aria-label="type"
                      // autoComplete="type"
                      id="type"
                      onChange={formik.handleChange}
                      value={formik.values.type}>
          <option>Тип проблемы</option>
          <option value="SOFT">Software</option>
          <option value="HARD">Hardware</option>
          <option value="OTHER">Other</option>
        </Form.Select>
        </Col>
      </Row>
      <Row>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='description' >Опишите вашу проблему максимально подробно</Form.Label>  
        <Form.Control
          as="textarea"
          rows={3}
          // autoComplete="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          />
      
      </Form.Group>
      </Row>
  
      <Button type="submit">Отправить тикет</Button>
      </Container>
    </Form>
  </FormikProvider>
  </>
}


export default TicketCreateForm;