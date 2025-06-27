import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, Cog6ToothIcon, BellIcon } from "@heroicons/react/24/outline";
import logo from "../assets/quesai.png";
import illustration from "../assets/illustration.png";

type Project = {
  id: number;
  name: string;
  files: any[];
};

const CreateProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCreateProject = (name: string) => {
    const newProject: Project = {
      id: Date.now(),
      name,
      files: [],
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleProjectClick = (projectId: number) => {
    const selectedProject = projects.find((p) => p.id === projectId);
    navigate(`/upload/${projectId}`, {
      state: { project: selectedProject },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="QuesAI Logo" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold text-purple-600">
            Ques.<span className="text-black font-normal">AI</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Cog6ToothIcon className="h-6 w-6 text-gray-700 cursor-pointer hover:text-black" />
          <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer hover:text-black" />
        </div>
      </header>

      {projects.length > 0 && (
        <div className="flex justify-end px-10 mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-gray-800"
          >
            <PlusIcon className="h-5 w-5" />
            Create New Project
          </button>
        </div>
      )}

      {projects.length === 0 && (
        <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Create a New Project
          </h2>
          <img
            src={illustration}
            alt="Project Illustration"
            className="max-w-xs md:max-w-md lg:max-w-lg mb-6"
          />
          <p className="text-gray-500 max-w-xl mb-8 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-gray-800"
          >
            <PlusIcon className="h-5 w-5" />
            Create New Project
          </button>
        </main>
      )}

      {projects.length > 0 && (
        <section className="px-10 mt-6">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Projects</h3>
          <div className="flex flex-wrap gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="flex items-center gap-3 border rounded-lg p-4 w-72 cursor-pointer hover:shadow-md transition"
              >
                <div className="flex items-center justify-center h-12 w-12 bg-yellow-400 text-white font-bold rounded">
                  {project.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-purple-700 text-sm">
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {project.files.length} Files
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Last edited just now
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">
              Create Project
            </h2>
            <label className="block text-sm text-gray-700 mb-1">
              Enter Project Name:
            </label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => {
                setNewProjectName(e.target.value);
                setError(false);
              }}
              className="w-full border rounded px-3 py-2 mb-1 outline-purple-600"
              placeholder="Type here"
            />
            {error && (
              <p className="text-sm text-red-500">
                Project Name Can't be empty
              </p>
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewProjectName("");
                  setError(false);
                }}
                className="text-red-500 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newProjectName.trim()) {
                    setError(true);
                    return;
                  }
                  handleCreateProject(newProjectName.trim());
                  setNewProjectName("");
                  setError(false);
                  setShowModal(false);
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
