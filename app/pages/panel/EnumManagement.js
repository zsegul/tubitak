'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Typography, Box, List, ListItem, Container, Grid, Card, CardContent, Divider } from '@mui/material';
import { axiosInstance } from "@/config/axios_config";
import { toast } from 'react-toastify';
import { EnumContext } from '../../contexts/EnumContext';
import handleErrors from '@/app/util/handleErrors';

const EnumManagement = () => {
  const { enumTypes, setEnumTypes } = useContext(EnumContext);
  const [selectedType, setSelectedType] = useState(null);
  const [enums, setEnums] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newEnum, setNewEnum] = useState("");
  const [modifiedTypeName, setModifiedTypeName] = useState("");
  const [modifiedEnums, setModifiedEnums] = useState([]);

  const categoryMapping = {
    Genel: ["Birim", "Unvan", "Personel Türü", "Akademik Unvan", "Kadro", "Çalışılan Proje", "Çalışma Türü", "Çalışma Durumu", "Görev", "Servis Kullanımı"],
    Eğitim: ["Eğitim Türü", "Üniversite/Okul", "Bölüm"],
    Katkılar: ["Etkinlik Türü"],
    Dosya: ["Dosya Türü", "Dosya Adı", "Yükleme Tarihi"]
  };

  useEffect(() => {
    if (selectedType) {
      axiosInstance.get(`/enums/${selectedType}`)
        .then(response => {
          setEnums(response.data);
          setModifiedEnums(response.data);
        })
        .catch(error => {
          // toast.error("Alanlar getirilirken bir hata oluştu");
          console.log(error);
        });
    }
  }, [selectedType]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleAddEnum = () => {
    if (newEnum.trim() === "") return;
    axiosInstance.post(`/enums/${selectedType}`, { name: newEnum })
      .then(response => {
        const updatedEnumTypes = { ...enumTypes, [selectedType]: [...enumTypes[selectedType], response.data.name] };
        setEnumTypes(updatedEnumTypes);
        setEnums([...enums, response.data]);
        setModifiedEnums([...modifiedEnums, response.data]);
        setNewEnum("");
        toast.success("Yeni alan başarıyla eklendi");
      })
      .catch(error => {
        toast.error("Alan eklenirken bir hata oluştu");
      });
  };

  const handleDeleteEnum = (id) => {
    axiosInstance.delete(`/enums/${id}`)
      .then(response => {
        const updatedEnumTypes = { ...enumTypes, [selectedType]: modifiedEnums.filter(e => e.id !== id).map(e => e.name) };
        setEnumTypes(updatedEnumTypes);
        setEnums(enums.filter(e => e.id !== id));
        setModifiedEnums(modifiedEnums.filter(e => e.id !== id));
        toast.success("Alan başarıyla silindi");
      })
      .catch(error => {
        handleErrors(error);
      });
  };

  const handleUpdateEnumType = () => {
    axiosInstance.put(`/enumTypes/${selectedType}`, { name: modifiedTypeName })
      .then(response => {
        const updatedEnumTypes = { ...enumTypes, [modifiedTypeName]: enumTypes[selectedType] };
        delete updatedEnumTypes[selectedType];
        setEnumTypes(updatedEnumTypes);
        setSelectedType(modifiedTypeName);
        setEditing(false);
        toast.success("Alan adı başarıyla güncellendi");
      })
      .catch(error => {
        toast.error("Alan adı güncellenirken bir hata oluştu");
        console.log(error);
      });
  };

  const handleUpdateEnums = () => {
    const body = modifiedEnums.map(e => ({ id: e.id, value: e.name }));
    axiosInstance.put("/enums", body)
      .then(response => {
        setEnums(modifiedEnums);
        const updatedEnumTypes = { ...enumTypes, [selectedType]: modifiedEnums.map(e => e.name) };
        setEnumTypes(updatedEnumTypes);
        setEditing(false);
        toast.success("Alanlar başarıyla güncellendi");
      })
      .catch(error => {
        toast.error("Alanlar güncellenirken bir hata oluştu");
      });
  };

  const handleCancelEdit = () => {
    setModifiedTypeName(selectedType);
    setModifiedEnums(enums);
    setEditing(false);
  };

  const handleEnumChange = (id, newName) => {
    setModifiedEnums(modifiedEnums.map(e => e.id === id ? { ...e, name: newName } : e));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Enum Categories List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              {Object.keys(categoryMapping).map(category => (
                <Box key={category} sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{category}</Typography>
                  <List>
                    {categoryMapping[category].map(type => (
                      <ListItem
                        button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        sx={{ mb: 1, borderRadius: 1, '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                      >
                        {type}
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ mb: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Enums for Selected Type */}
        <Grid item xs={12} md={8}>
          {selectedType ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Alan Adı</Typography>
                {editing ? (
                  <Box mb={2}>
                    <TextField
                      label="Alan Adını Düzenle"
                      variant="outlined"
                      value={modifiedTypeName}
                      onChange={(e) => setModifiedTypeName(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateEnumType}
                        disabled={true}
                      >
                        Alan Adı Kaydet
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancelEdit}
                      >
                        İptal
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box mb={2}>
                    <Typography variant="h6">{selectedType}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setEditing(true);
                        setModifiedTypeName(selectedType);
                      }}
                    >
                      Düzenle
                    </Button>
                  </Box>
                )}
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>Yanıt Seçenekleri</Typography>
                <List>
                  {modifiedEnums.map(e => (
                    <ListItem
                      key={e.id}
                      sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                    >
                      {editing ? (
                        <TextField
                          variant="outlined"
                          value={e.name}
                          onChange={event => handleEnumChange(e.id, event.target.value)}
                          sx={{ mr: 2, flexGrow: 1 }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>{e.name}</Typography>
                      )}
                      {editing && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteEnum(e.id)}
                        >
                          Sil
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
                {editing && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateEnums}
                      sx={{ mb: 2 }}
                    >
                      Alanları Kaydet
                    </Button>
                    <TextField
                      label="Yeni Alan Adı"
                      variant="outlined"
                      value={newEnum}
                      onChange={(e) => setNewEnum(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddEnum}
                    >
                      Alan Ekle
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Typography>Mevcut alanlarını görmek için bir alan adına tıklayın</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EnumManagement;