import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { checkEmail } from "../utils/validation";
import CustomButton from "../components/common/CustomButton";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: 30,
    background: "#ffffff",
    "& .MuiFormControl": {
      width: 400,
      height: 30,
    },
    "& .MuiInputBase-root": {
      height: 30,
    },
  },
}));

const SignIn = () => {
  const { handleSubmit, control, watch } = useForm();
  const values = watch();
  const classes = useStyles();

  const isEveryFieldValid = () => {
    const { email, password } = values;
    if (checkEmail(email) && password !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    const reqData = {
      id: email,
      pw: password,
    };
    try {
      const res = await axios.post(
        "https://api.supaja.com:8000/test-api/sign-in",
        reqData
      );

      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        alert("로그인에 성공하였습니다.");
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Wrapper>
      <Header>학생 로그인</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Label>이메일</Label>
          <Controller
            autoFocus
            className={classes.root}
            as={TextField}
            name="email"
            placeholder="이메일을 입력해주세요"
            control={control}
            variant="outlined"
            required
            error={checkEmail(values.email) || !values.email ? false : true}
            helperText={
              checkEmail(values.email) || !values.email
                ? false
                : "이메일을 입력해주세요."
            }
            autoComplete="off"
          />
        </Container>
        <Container>
          <Label>비밀번호</Label>
          <Controller
            className={classes.root}
            as={TextField}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            control={control}
            variant="outlined"
            type="password"
            required
          />
        </Container>
        <CustomButton
          value={"로그인"}
          disabled={isEveryFieldValid() ? false : true}
          isEveryFieldValid={isEveryFieldValid()}
        />
      </Form>
      <JoinMembership>
        수파자 계정이 없으신가요?{" "}
        <Link to={`/signup`}>
          <Join>회원가입</Join>
        </Link>
      </JoinMembership>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 50px;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  height: 50px;
  width: 400px;
  margin-bottom: 20px;
`;

const Label = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  width: 400px;
  height: 15px;
  font-size: 15px;
`;

const JoinMembership = styled.p`
  width: 400px;
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: #b0b1b2;
`;

const Join = styled.span`
  color: #6f63e9;
  font-weight: bold;
`;
