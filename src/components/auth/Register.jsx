import {
    Box,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Button,
    Link,
    Text,
  } from "@chakra-ui/react";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { DASHBOARD, LOGIN } from "../../lib/routes.jsx";
  import { useRegister, useAuth } from "../../hooks/auth.jsx";
  import { useForm } from "react-hook-form";
  import {
    emailValidate,
    passwordValidate,
    usernameValidate,
  } from "../../utils/form-validate.jsx";
  import { useEffect } from "react";
  
  export const Register = () => {
    const { register: signup, isLoading } = useRegister();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const { user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => { //redirect to dashboard if logged in
      if (!authLoading && user) {
        navigate(DASHBOARD);
      }
    }, [user, authLoading]);
  
    async function handleRegister(data) {
      signup({
        email: data.email,
        password: data.password,
        username: data.username,
        redirectTo: DASHBOARD,
      });
    }
    
    return (
      <Center w={"100%"} h={"100vh"}>
        <Box mx={"1"} maxW={"md"} p={"9"} borderWidth={"1px"} borderRadius={"lg"}>
          <Heading mb={"4"} size={"lg"} textAlign={"center"}>
            Register
          </Heading>
  
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={errors.username} py={"2"}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="username"
                autoComplete="username"
                {...register("username", usernameValidate)}
              />
              <FormErrorMessage>
                {errors.username ? errors.username.message : null}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} py={"2"}>
              <FormLabel>Email</FormLabel>
              <Input
                type={"email"}
                autoComplete="email"
                placeholder="user@email.com"
                {...register("email", emailValidate)}
              />
              <FormErrorMessage>
                {errors.email ? errors.email.message : null}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} py={"2"}>
              <FormLabel>Password</FormLabel>
              <Input
                type={"password"}
                autoComplete="new-password"
                placeholder="password123"
                {...register("password", passwordValidate)}
              />
              <FormErrorMessage>
                {errors.password ? errors.password.message : null}
              </FormErrorMessage>
            </FormControl>
            <Button
              type={"submit"}
              colorScheme={"red"}
              w={"full"}
              mt={"4"}
              isLoading={isLoading}
              loadingText={"Signing up"}
            >
              {" "}
              Register{" "}
            </Button>
            <Text fontSize={"xlg"} align={"center"} mt={"6"}>
              Already have an account?{" "}
              <Link
                as={RouterLink}
                to={LOGIN}
                color={"red.500"}
                fontWeight={"medium"}
                textDecor={"underline"}
                _hover={{ background: "red.100" }}
              >
                Log In
              </Link>{" "}
              instead!
            </Text>
          </form>
        </Box>
      </Center>
    );
  };
  