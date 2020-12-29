import React, { useState } from 'react';
import { addIdea } from '../services/ProjectIdeaService';
import { ProjectIdea } from '../types/ProjectIdea';
// components
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  addIdea: (idea: ProjectIdea) => void;
};

type Response = {
  id: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AddIdeaModal: React.FC<ModalProps> = (props: ModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await delay(1000);

      const response: Response = await addIdea({
        title,
        description,
      });

      props.addIdea({
        title: title,
        description: description,
        id: response.id,
      });

      props.closeModal();
    } catch (e: any) {
      toast({
        title: 'Save Error!',
        description: 'There was a problem saving your idea. Please try again! :(',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  return (
    <Modal isOpen={props.open} onClose={props.closeModal}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader color="tomato">Add a Project Idea</ModalHeader>
          <ModalCloseButton color="tomato" />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel color="tomato">Title</FormLabel>
              <Input name="title" placeholder="My Best Idea" onChange={onTitleChange} />
              <FormErrorMessage>there is a problem here</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="tomato">Description</FormLabel>
              <Input name="description" placeholder="This is a really cool idea" onChange={onDescriptionChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button color="tomato" borderColor="tomato" mr={3} type="submit" isLoading={loading}>
              Save
            </Button>
            <Button color="tomato" borderColor="tomato" onClick={props.closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export { AddIdeaModal };
