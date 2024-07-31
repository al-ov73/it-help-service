import { useState } from 'react';
import { FormikProvider, useFormik } from "formik";
import routes from "../routes/routes";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { toast } from 'react-toastify';
import Container from "react-bootstrap/esm/Container";
import { jwtDecode } from "jwt-decode";
import SpinnerEl from './Spinner.jsx';


const TicketCreateForm = () => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true)
    const title = values.title;
    const description = values.description;
    const priority = values.priority;
    const type = values.type;
    try {
      const { tokens } = JSON.parse(localStorage.getItem('user'))
      const decoded = jwtDecode(tokens.access);
      const currentUserId = decoded.user_id;
      const requestBody = {
        title,
        description,
        priority,
        type,
        author: currentUserId,
      };
      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        }
      }
      axios.post(routes.ticketCreatePath, requestBody, requestHeaders)
        .then(() => setLoading(false))
        .then(() => toast.success('Тикет отправлен!'))
        .catch((e) => {
          setLoading(false)
          console.log('TicketCreateForm error', e);
        })
    } catch (e) {
      setLoading(false)
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
  <h2 className="text-center mb-4">Создать тикет</h2>
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
  
      <Button type="submit"
              disabled={isLoading}
              >
        {isLoading ? <SpinnerEl/> : 'Отправить тикет'}
      </Button>
      </Container>
    </Form>
  </FormikProvider>
  </>
}


export default TicketCreateForm;