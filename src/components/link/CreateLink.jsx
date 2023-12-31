import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useAddLink } from "../../hooks/links.jsx";
import { useAuth } from "../../hooks/auth.jsx";
import { linkTitleValidate, linkValidate } from "../../utils/form-validate.jsx";
import { useForm } from "react-hook-form";

export const CreateLink = ({ isOpen, onClose }) => {
  const { addLink, isLoading } = useAddLink();
  const { user, isLoading: authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //create link function
  async function handleCreateLink(data) { 
    await addLink({
      uid: user.id,
      title: data.title,
      link: data.link,
    });
    onClose();
  }

  if (authLoading) return "Loading...";

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleCreateLink)}>
              <FormControl isInvalid={errors.title} py={"2"}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder={"My Website"}
                  name="title"
                  mb={"1rem"}
                  {...register("title", linkTitleValidate)}
                />
                <FormErrorMessage>
                  {errors.title?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.link} py={"2"}>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder={"https://super-long-link.com/sfhagk13kj1"}
                  name="link"
                  {...register("link", linkValidate)}
                />
                <FormErrorMessage>
                  {errors.link?.message}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              type="submit"
              onClick={handleSubmit(handleCreateLink)}
            >
              Shorten Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
