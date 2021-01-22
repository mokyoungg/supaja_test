import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { checkPassword, checkPhoneNumber } from "../utils/validation";
import CustomCheckbox from "../components/common/CustomCheckbox";
import CustomButton from "../components/common/CustomButton";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

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

const SignUp = () => {
  const { handleSubmit, control, watch } = useForm();
  const onSubmit = (data) => {
    alert("회원가입에 성공했습니다.");
  };
  const values = watch();
  const classes = useStyles();

  const isEveryFieldValid = () => {
    const {
      name,
      myPhoneNum,
      parentPhoneNum,
      code,
      password,
      password2,
      parentAgree,
      policyAgree,
    } = values;
    if (
      checkPhoneNumber(myPhoneNum) &&
      checkPhoneNumber(parentPhoneNum) &&
      checkPassword(password) &&
      name !== "" &&
      myPhoneNum !== "" &&
      parentPhoneNum !== "" &&
      code !== "" &&
      password !== "" &&
      password2 !== "" &&
      parentAgree !== false &&
      policyAgree !== false
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Wrapper>
      <Header>만 14세 미만 회원가입</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Label>이름</Label>
          <Controller
            // inputProps={{ style: inputStyle }}
            className={classes.root}
            as={TextField}
            name="name"
            placeholder="이름을 입력해주세요"
            control={control}
            variant="outlined"
            color="secondary"
            autoComplete="off"
            required
          />
        </Container>
        <Container>
          <Label>본인 핸드폰 번호</Label>
          <Controller
            autoFocus
            className={classes.root}
            as={TextField}
            name="myPhoneNum"
            placeholder="핸드폰 번호를 입력해주세요"
            control={control}
            variant="outlined"
            required
            error={
              checkPhoneNumber(values.myPhoneNum) || !values.myPhoneNum
                ? false
                : true
            }
            helperText={
              checkPhoneNumber(values.myPhoneNum) || !values.myPhoneNum
                ? false
                : "핸드폰 번호를 입력해주세요."
            }
            autoComplete="off"
          />
          <SendButton>전송</SendButton>
        </Container>
        <Container>
          <Label>인증코드</Label>
          <Controller
            className={classes.root}
            as={TextField}
            name="code"
            placeholder="인증코드를 입력해주세요"
            control={control}
            variant="outlined"
            required
            autoComplete="off"
          />
        </Container>
        <Container>
          <Label>법정대리인(부모님) 핸드폰 번호</Label>
          <Controller
            className={classes.root}
            as={TextField}
            name="parentPhoneNum"
            placeholder="법정대리인의 핸드폰 번호를 입력해주세요"
            control={control}
            variant="outlined"
            required
            error={
              checkPhoneNumber(values.parentPhoneNum) || !values.parentPhoneNum
                ? false
                : true
            }
            helperText={
              checkPhoneNumber(values.parentPhoneNum) || !values.parentPhoneNum
                ? false
                : "핸드폰 번호를 입력해주세요."
            }
            autoComplete="off"
          />
          <SendButton>본인인증</SendButton>
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
            error={
              checkPassword(values.password) || !values.password ? false : true
            }
            helperText={
              checkPassword(values.password) || !values.password
                ? false
                : `비밀번호를 입력해주세요. (최소 8자, 숫자, 문자,특수문자 포함)`
            }
          />
        </Container>
        <Container>
          <Label>비밀번호 확인</Label>
          <Controller
            className={classes.root}
            as={TextField}
            name="password2"
            placeholder="비밀번호를 입력해주세요"
            control={control}
            variant="outlined"
            type="password"
            required
            error={
              values.password === values.password2 || !values.password2
                ? false
                : true
            }
            helperText={
              values.password === values.password2 || !values.password2
                ? false
                : `비밀번호를 확인해주세요.`
            }
          />
        </Container>
        <Line></Line>
        <AgreeContainer>
          <Controller
            name="parentAgree"
            control={control}
            defaultValue={false}
            rulse={{ required: true }}
            render={(props) => (
              <CustomCheckbox
                onChange={(e) => props.onChange(e.target.checked)}
                checked={props.value}
              />
            )}
          />
          <AgreeLabel>
            법정대리인(부모님)의 동의를 받았음을 인정합니다.
          </AgreeLabel>
        </AgreeContainer>
        <AgreeContainer>
          <Controller
            name="policyAgree"
            control={control}
            defaultValue={false}
            rulse={{ required: true }}
            render={(props) => (
              <CustomCheckbox
                onChange={(e) => props.onChange(e.target.checked)}
                checked={props.value}
              />
            )}
          />
          <AgreeLabel>개인정보 처리방침에 동의합니다.</AgreeLabel>
          <AddBoxOutlinedIcon
            style={{ fontSize: 20, color: "#b0b1b2", marginLeft: 150 }}
          />
        </AgreeContainer>
        <CustomButton
          disabled={isEveryFieldValid() ? false : true}
          isEveryFieldValid={isEveryFieldValid()}
          value={"회원가입"}
        />
      </Form>
    </Wrapper>
  );
};

export default SignUp;

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
  margin-top: 50px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  width: 400px;
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  width: 400px;
  height: 15px;
  font-size: 15px;
  z-index: 20;
`;

const SendButton = styled.button`
  font-size: 13px;
  color: #b0b1b2;
  background-color: transparent;
  z-index: 10;
  position: absolute;
  top: 50%;
  right: 0;
`;

const Line = styled.div`
  height: 1px;
  width: 400px;
  background-color: #b0b1b2;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const AgreeContainer = styled.div`
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 40px;
  background: #ffffff;
  width: 400px;
  margin-bottom: 10px;
`;

const AgreeLabel = styled.p`
  font-size: 12px;
  font-weight: bold;
`;
