import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Category {
  id: string;
  image: string;
  title: string;
}

interface IBGEUF {
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const CreatePoint = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [modal, setModal] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, []);

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUF[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => {
      const ufsInitials = response.data.map(uf => uf.sigla);

      setUfs(ufsInitials);
    })
  })

  useEffect(() => {
    if (selectedUf === '0') setCities([]);

    axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response => {
      const ufCities = response.data.map(city => city.nome);

      setCities(ufCities);
    })

  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const ufSelection = event.target.value;

    setSelectedUf(ufSelection);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const citySelection = event.target.value;

    setSelectedCity(citySelection);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedCategories(id: string) {
    const checkIfSelected = selectedCategories.findIndex(category => category === id);

    if (checkIfSelected >= 0) {
      const filteredCategories = selectedCategories.filter(category => category !== id);

      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories([ ...selectedCategories, id ]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;
    const uf = selectedUf;
    const city = selectedCity;
    const categories = selectedCategories;

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city,
      categories,
    }

    const values = Object.values(data)
    // eslint-disable-next-line
    const checkIfIsFilels = values.filter(value => { if (value === '' || value == 0) return value })

    if (checkIfIsFilels.length > 0) {
      return alert('Fill all fields');
    } else {
      await api.post('/points', data);

      setModal('active')

      setTimeout(() => {history.push('/')}, 2500);
    }

  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadatro do ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">

            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectUf}
                value={selectedUf}
              >
                <option value="0">Selecione um estado</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={handleSelectCity}
                value={selectedCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">

            {categories.map(category => (
              <li
                key={category.id}
                onClick={() => handleSelectedCategories(category.id)}
                className={selectedCategories.includes(category.id) ? "selected" : ""}
              >
                <img src={category.image} alt={category.title}/>
                <span>{category.title}</span>
              </li>
            ))}

          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>

      <div id='modal' className={modal}>
        <FiCheckCircle size={200} />
        <h1>Cadastro concluído!!</h1>
      </div>
    </div>
  );
}

export default CreatePoint;
