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
} from "@chakra-ui/react";
import { useAddLink } from "../../hooks/links.jsx";
import { useAuth } from "../../hooks/auth.jsx";
import { useState } from "react";

export const CreateLink = ({ isOpen, onClose }) => {
  const { addLink, isLoading } = useAddLink();
  const { user, isLoading: authLoading } = useAuth();
    const [data, setData] = useState({});

function handleChange(e){
    setData({...data, [e.target.name]: e.target.value})
    console.log(data)
}
function handleSubmit(e){
    e.preventDefault()
    handleCreateLink(data)
}

  async function handleCreateLink(data) {
    console.log(data);
    await addLink({
      uid: user.id,
      title: data.title,
      link: data.link,
    });
    onClose();
  }

  if (authLoading) return "Loading..."

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form onSubmit={handleCreateLink}>
            <label htmlFor="title">Title</label>
            <Input
              placeholder={"My Website"}
              name="title"
              mb={"1rem"}
              onChange={handleChange}
            />
            <label htmlFor="link">Link</label>
            <Input
              placeholder={"https://super-long-link.com/sfhagk13kj1"}
              name="link"
              onChange={handleChange}
            />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              type="submit"
              onClick={handleSubmit}
            >
              Shorten Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
