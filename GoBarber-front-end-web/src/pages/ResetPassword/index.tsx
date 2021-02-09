import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';


import { Container, Content, AnimationContainer, Background } from './styles';
import getValidationError from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();


  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatório'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password')],
          'A senha deve ser a mesma do campo acima',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {password, password_confirmation} = data;
      const token = location.search.replace('?token', '')

      if(!token) {
        throw new Error();
      }

      await api.post('password/reset', {
        password,
        password_confirmation,
        token
      })

      history.push('/');

    } catch(err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }

    addToast({
      type: 'error',
      title: 'Erro ao resetar',
      description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
    });
  }, [addToast, history, location.search]);

  return(
    <Container>
      <Content>
          <AnimationContainer>

          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Refazer senha</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
            <Input name="password_confirmation" icon={FiMail} placeholder="Confirmar sua senha" />

            <Button type="submit">Alterar senha</Button>

          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default ResetPassword;
