import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { MdModeEdit, MdOutlineCancel } from "react-icons/md"
import { api } from './services/api'
import { FaPlay } from "react-icons/fa";


interface CustomerProps {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  trailer_url: string;
} // Isso vai indicar para o customers que ele é um CustomerProps que é um array

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [editingCustomer, setEditingCustomer] = useState<CustomerProps | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [editedTrailer, setEditedTrailer] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  }, []) // O colchete vazio sinaliza que ele não depende de nada e vai rodar quando o componente for carregado

  async function loadCustomers() {
    const response = await api.get("/")
    console.log(response.data);
    setCustomers(response.data); // Vai começar com a array vazia ate ele buscar o componente, quando buscar vai passar para o useState
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault() // Previne o comportamento padrão, não atualiza a tag do formulario

    if (!titleRef.current?.value || !descriptionRef.current?.value || !imgRef.current?.value || !videoRef.current?.value) return;

    try {
      const response = await api.post("/", {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        image_url: imgRef.current?.value,
        trailer_url: videoRef.current?.value
      });

      setCustomers(prevCustomers => [...prevCustomers, response.data]);

      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
      imgRef.current!.value = "";
      videoRef.current!.value = "";
    } catch (err) {
      console.log(err);
    }
  }


  async function handleDelete(_id: string) {
    try {
      await api.delete(`/${_id}`)
      setCustomers(customers.filter(customer => customer._id !== _id)); // Remove o filme deletado da lista de filmes exibida no frontend
    } catch (err) {
      console.log(err)
    }
  }

  function handleOpenEditForm(customer: CustomerProps) {
    setEditingCustomer(customer);
    setEditedTitle(customer.title);
    setEditedDescription(customer.description);
    setEditedImage(customer.image_url);
    setEditedTrailer(customer.trailer_url);
    setShowModal(true)
  }

  async function handleEditSubmit(event: FormEvent) {
    event.preventDefault();

    if (!editingCustomer) return;

    try {
      const response = await api.put(`/${editingCustomer._id}`, {
        title: editedTitle,
        description: editedDescription,
        image_url: editedImage,
        trailer_url: editedTrailer
      });

      const updatedCustomers = customers.map(customer => {
        if (customer._id === editingCustomer._id) {
          return response.data;
        }
        return customer;
      });

      setCustomers(updatedCustomers);
      setEditingCustomer(null);
      setShowModal(false)
    } catch (err) {
      console.log(err);
    }
  }

  function handleCancelEdit() {
    setEditingCustomer(null);
    setShowModal(false);
  }


  const [showTrailerId, setShowTrailerId] = useState<string | null>(null)

  function handleToggleTrailer(customerId: string) {
    setShowTrailerId(showTrailerId === customerId ? null : customerId)
  }

  const filteredCustomers = customers.filter(customers => {
    return customers.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="w-full min-h-screen bg-amber-400 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-7xl bg-white p-10 rounded-xl drop-shadow-2xl">
        <div className="flex justify-center">
          <h1 className="text-7xl font-medium text-black font-harrypotter relative ">Filmes Harry Potter<hr className="w-full mt-1 border-red-500" style={{ borderTopWidth: '4px' }} /></h1>
        </div>


        <div className="flex md:justify-between max-md:flex-col  mt-6 mb-3">
          <input
            type="text"
            placeholder="Buscar Filme"
            value={searchTerm}
            name='buscarFilme'
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-2/3 p-2 max-md:mb-3 rounded-lg border-2 bg-slate-50"

          />
          <button
            className="bg-red-500 text-white py-2 px-4 max-w-40 rounded hover:scale-105 duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Fechar Cadastro" : "Cadastrar Filme"}
          </button>
        </div>
        {showForm && (
          <form className="flex flex-col mt-6 mb-12" onSubmit={handleSubmit}>
            <label className="font-medium text-lg text-black">Titulo:</label>
            <input
              type="text"
              placeholder="Digite o titulo do filme"
              className="w-full mb-5 p-2 rounded-lg border-2 bg-slate-50"
              ref={titleRef}
            />

            <label className="font-medium text-lg text-black">Descrição:</label>
            <input
              type="text"
              placeholder="Digite a descrição do filme"
              className="w-full mb-5 p-2 rounded-lg border-2 bg-slate-50"
              ref={descriptionRef}
            />

            <label className="font-medium text-lg text-black">URL da capa:</label>
            <input
              type="text"
              placeholder="Insira a URL da capa do filme"
              className="w-full mb-5 p-2 rounded-lg border-2 bg-slate-50"
              ref={imgRef}
            />

            <label className="font-medium text-lg text-black">Embed do trailer:</label>
            <input
              type="text"
              placeholder="Insira o embed do trailer do filme"
              className="w-full mb-9 p-2 rounded-lg border-2 bg-slate-50"
              ref={videoRef}
            />


            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer w-full p-2 bg-amber-400 rounded font-medium text-white"
            />
          </form>
        )}


        <section className="flex flex-col">
          {filteredCustomers.map((customer) => (
            <article key={customer._id} className="w-full rounded p-6 relative hover:scale-105 duration-200 mb-10 border-2 mt-4 bg-slate-50">
              {/* A imagem e a legenda está em colunas até chegar em 789px, a partir dai a imagem ficará lado a lado com titulo e descrição
              Igualmente para o espaço que só será colocado quando a tela estiver grande*/}
              <div className="flex flex-col md:flex-row md:space-x-10">
                {customer.image_url && (
                  // A imagem é full até chegar em 769px, a partir dai a imagem ficara com 1/3 do tamanho da div pai
                  <div className="w-full md:w-1/3">
                    <img src={customer.image_url} alt="Capa do filme" className="md:w-full w-56 mx-auto max-md:my-4" />
                  </div>
                )}
                <div className="w-full md:w-2/3">
                  <p className="text-4xl font-harrypotter"> {customer.title}</p>
                  <p className='text-base'><span className="font-bold">Descrição:</span> {customer.description}</p>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded mt-4 absolute md:-bottom-3 md:right-6 max-md:-top-6 max-md:left-6 flex items-center hover:scale-105 duration-200"
                    onClick={() => handleToggleTrailer(customer._id)}
                  >
                    <FaPlay className="mr-2" />{showTrailerId === customer._id ? "Ocultar Trailer" : "Ver Trailer"}
                  </button>
                </div>
              </div>



              {showTrailerId === customer._id && (

                <div className="flex justify-center mt-5 mb-5 border-t-2 pt-5">
                  {customer.trailer_url && (
                    <iframe
                      className='w-96 h-60'
                      src={customer.trailer_url}
                      title="YouTube video player"
                    ></iframe>
                  )}
                </div>
              )}

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-6 -top-2 hover:scale-105 duration-200"
                onClick={() => handleDelete(customer._id)}
              >
                <FiTrash2 size={18} color='#fff' />
              </button>
              <button
                className="bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-16 -top-2 hover:scale-105 duration-200"
                onClick={() => handleOpenEditForm(customer)}
              >
                <MdModeEdit size={18} color='#fff' />
              </button>


            </article>
          ))}

        </section>


      </main>


      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-8/12 max-w-3xl relative">
            <div className="flex justify-center mb-4">
              <h1 className="text-4xl font-medium text-black relative ">Edite o Filme<hr className="w-full mt-1 border-red-500" style={{ borderTopWidth: '4px' }} /></h1>
            </div>
            <form onSubmit={handleEditSubmit} className='flex flex-col'>
              <label className="font-medium text-black">Titulo:</label>
              <input
                className='border-2 p-2 mb-5 rounded bg-slate-50'
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <label className="font-medium text-black">Descrição:</label>
              <textarea
                className="mb-5 p-2 rounded border-2 bg-slate-50"
                rows={10} // Defina o número de linhas visíveis
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />

              <label className="font-medium text-black">URL da capa:</label>
              <textarea
                className="w-full mb-5 p-2 rounded border-2 bg-slate-50"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
              />

              <label className="font-medium text-black">URL do trailer:</label>
              <input
                className='border-2 p-2 mb-5 rounded bg-slate-50'
                type="text"
                value={editedTrailer}
                onChange={(e) => setEditedTrailer(e.target.value)}
              />
              <div className="flex justify-center">
                <button type="submit" className="bg-green-500 px-6 py-2 rounded-md text-white hover:scale-105 duration-200 w-full md:w-8/12">Salvar Edição</button>
              </div>

              <button type='button' onClick={handleCancelEdit} className=" absolute right-2 top-2"><MdOutlineCancel size={36} color='#dc2626' /></button>


            </form>
          </div>
        </div>
      )}
    </div>
  )
}