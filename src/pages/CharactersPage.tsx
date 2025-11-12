import { useEffect, useState } from "react";
import { getPeople, type HomeworldDetails, type Person } from "../api/swapi";
import CharacterCard from "../components/CharactersCard";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import axios from "axios";
import Fallback from "../components/Fallback";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Person[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [homeWorldDetails, setHomeWorldDetails] = useState<HomeworldDetails>()
  const [selectedCharacter, setSelectedCharacter] = useState<Person | null | undefined>();
  const [search, setSearch] = useState<string>("")

  async function fetchData({ page, search }: { page: number; search: string }) {
    try {
      setLoading(true);
      const data = await getPeople({ page, search });
      setTotalRecords(data.count);
      setCharacters(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const changeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getHomeWorldDetails = async (url: string) => {
    try {
      const response = await axios.get(url);
      setHomeWorldDetails(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const hanldeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }


  useEffect(() => {
    fetchData({ page, search });
  }, [page, search]);

  useEffect(() => {
    const url = selectedCharacter?.homeworld;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getHomeWorldDetails(url);
  }, [selectedCharacter])

  return (
    <div className="min-h-screen px-5 mt-4">
      <h1 className="text-5xl font-bold text-center mb-6">Star Wars Characters</h1>
      <div className="border border-gray-300 rounded-xl p-6">
        {loading && (
          <div className="text-center text-gray-600 mb-6 flex items-center justify-center min-h-[515px]">
            <Loader />
          </div>
        )}

        <div
          className="
            grid 
            gap-6
            place-items-center
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {!loading &&
            characters.map((character) => (
              <CharacterCard key={character.name} character={character} onClick={() => setSelectedCharacter(character)} />
            ))}

          {(!loading && characters.length === 0) &&
            <div className="min-h-[400px]">
              <Fallback />
            </div>
          }
        </div>
      </div>

      {/* Pagination */}
      <div className="my-3 flex justify-center gap-4 ">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="
            cursor-pointer
            px-4 py-2 bg-gray-300 rounded 
            hover:bg-gray-400 transition 
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Previous
        </button>


        <button
          disabled={page === Math.ceil(totalRecords / 10)}
          onClick={() => setPage((prev) => prev + 1)}
          className="
          cursor-pointer
          px-4 py-2 bg-blue-500 text-white rounded 
          hover:bg-blue-600 transition 
          disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">Showing page {page} out of {Math.ceil(totalRecords / 10)} </div>

      <Modal open={!!selectedCharacter} onClose={() => setSelectedCharacter(null)} character={selectedCharacter}>
        {selectedCharacter && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{selectedCharacter.name}</h2>
            <img
              src={`https://picsum.photos/seed/${selectedCharacter.name}/300/300`}
              alt={selectedCharacter.name}
              className="w-50 h-40 rounded-lg object-cover mx-auto mb-4"
            />
            <p className="text-gray-600 font-semibold">Height : <span className="font-normal"> {Number(selectedCharacter?.height) / 100} m</span></p>
            <p className="text-gray-600 font-semibold">Movies : <span className="font-normal"> {selectedCharacter?.films?.length} {selectedCharacter.films.length > 1 ? 'Films' : 'Film'}</span></p>
            <p className="text-gray-600 font-semibold">Birth Year : <span className="font-normal">{selectedCharacter?.birth_year} </span> </p>
            <p className="text-gray-600 font-semibold">Created on : <span className="font-normal"> {changeDate(selectedCharacter?.created)}</span></p>
            <p className="text-gray-600 font-semibold">Body Weight : <span className="font-normal"> {selectedCharacter?.mass} {selectedCharacter?.mass !== "unknown" && 'Kg'}</span></p>
            <div className="border-2 border-gray-300/60 mt-2 rounded-lg">
              <div className="text-gray-600 font-semibold mb-1">Homeworld Details</div>
              <p className="text-gray-600 font-semibold">Planet name : <span className="font-normal"> {homeWorldDetails?.name}</span></p>
              <p className="text-gray-600 font-semibold">Climate : <span className="font-normal"> {homeWorldDetails?.climate}</span></p>
              <p className="text-gray-600 font-semibold">Terrain : <span className="font-normal"> {homeWorldDetails?.terrain}</span></p>
              <p className="text-gray-600 font-semibold">Population : <span className="font-normal"> {homeWorldDetails?.population}</span></p>
            </div>
          </div>
        )}
      </Modal>
      <input placeholder={'Search by Character Name'} className=" mt-2 w-full sm:w-1/2 mx-auto block border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" type='text' onChange={(e) => hanldeInput(e)} />
    </div>
  );
}
