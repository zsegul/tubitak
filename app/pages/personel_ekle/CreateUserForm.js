import React, { useState, useContext, useEffect } from 'react';
import FormContainer from './components/FormContainer';
import FieldSection from './components/FieldSection';
import { axiosInstance } from "@/config/axios_config";
import { EmptyFields, englishMapping, leftSideFields, rightSideFields, requiredFields } from './constants';
import { toast } from "react-toastify";
import { EnumContext } from '../../contexts/EnumContext';
import handleErrors from '../../util/handleErrors';

const CreateUserForm = () => {
  const [formValues, setFormValues] = useState(EmptyFields);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  const { dropDownEnumTypes } = useContext(EnumContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const projectTeams = projects.find(project => project.projectName === selectedProject)?.teams || [];
      const teamNames = projectTeams.map(team => team.teamName);
      setTeams(teamNames);
    } else {
      setTeams([]);
    }
  }, [selectedProject, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === 'Çalışılan Proje') {
      setSelectedProject(value);
      setFormValues(prevValues => ({ ...prevValues, team: '' }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormValues(EmptyFields);
    setImage(null);
    setSelectedProject('');
  }

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formValues[field]) {
        newErrors[field] = `${field} zorunludur`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const body = Object.keys(formValues).reduce((acc, key) => {
        acc[englishMapping[key]] = formValues[key];
        return acc;
      }, {});

      body['image'] = image ? image.split(',')[1] : '';
           
      await axiosInstance.post('/user', body, { withCredentials: true })
        .then(() => {
          toast.success('User created successfully');
          resetForm();
        })
        .catch((error) => {
          handleErrors(error);
        });
    }
  };

  return (
    <FormContainer title="Personel Ekle" onSubmit={handleSubmit}>
      <FieldSection
        title="Genel"
        fields={leftSideFields}
        formValues={formValues}
        handleChange={handleChange}
        errors={errors}
        dropDownEnumTypes={dropDownEnumTypes}
        selectedProject={selectedProject}
        teams={teams}
        side={'left'}
        image={image}
        handleImageChange={handleImageChange}
      />
      <FieldSection
        title="Diğer"
        fields={rightSideFields}
        formValues={formValues}
        handleChange={handleChange}
        errors={errors}
        dropDownEnumTypes={dropDownEnumTypes}
        selectedProject={selectedProject}
        teams={teams}
        side={'right'}
        image={image}
        handleImageChange={handleImageChange}
      />
    </FormContainer>
  );
}

export default CreateUserForm;
