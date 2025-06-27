import React, { useState, useEffect } from "react";
import {
  RssIcon,
  VideoCameraIcon,
  ArrowUpTrayIcon,
  CloudArrowUpIcon,
  PlusIcon,
  PencilIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  QuestionMarkCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import quesAI from "../assets/quesAI.png";
import youtube from "../assets/youtube.png";
import rss from "../assets/rss.png";
import { useLocation } from "react-router-dom";

const UploadFlowPage: React.FC = () => {
  const location = useLocation();
  const project = location.state?.project;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<
    "rss" | "youtube" | "file" | null
  >(null);
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; date: string; time: string; transcript: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<
    "upload" | "repurpose" | "widget" | "upgrade"
  >("upload");
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("uploadedFiles");
    if (stored) setUploadedFiles(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const openModal = (type: "rss" | "youtube" | "file") => {
    setUploadType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setName("");
    setTranscript("");
  };

  const handleUpload = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUploadedFiles([
      ...uploadedFiles,
      { name: name || "Untitled Upload", date, time, transcript },
    ]);
    closeModal();
  };

  const getUploadTitle = () => {
    switch (uploadType) {
      case "rss":
        return "Upload from RSS Feed";
      case "youtube":
        return "Upload from Youtube";
      case "file":
        return "Upload Files";
      default:
        return "";
    }
  };

  const getUploadIcon = () => {
    switch (uploadType) {
      case "rss":
        return <RssIcon className="h-8 w-8 text-orange-500" />;
      case "youtube":
        return <VideoCameraIcon className="h-8 w-8 text-red-600" />;
      case "file":
        return <ArrowUpTrayIcon className="h-8 w-8 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex font-sans relative h-screen overflow-hidden">
      <aside
        className="relative bg-white border-r shadow-sm flex flex-col justify-between transition-all duration-300"
        style={{ width: isCollapsed ? 80 : 256 }}
      >
        <div className="p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-10">
              <img src={quesAI} className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-purple-600">
                Ques.<span className="font-normal text-black">AI</span>
              </h1>
            </div>
          )}
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                activeTab === "upload"
                  ? "text-purple-600 font-semibold bg-purple-50"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <PlusIcon className="h-5 w-5" />
              {!isCollapsed && "Add your Podcast(s)"}
            </button>
            <button
              onClick={() => setActiveTab("repurpose")}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                activeTab === "repurpose"
                  ? "text-purple-600 font-semibold bg-purple-50"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <PencilIcon className="h-5 w-5" />
              {!isCollapsed && "Create & Repurpose"}
            </button>
            <button
              onClick={() => setActiveTab("widget")}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                activeTab === "widget"
                  ? "text-purple-600 font-semibold bg-purple-50"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <PuzzlePieceIcon className="h-5 w-5" />
              {!isCollapsed && "Podcast Widget"}
            </button>
            <button
              onClick={() => setActiveTab("upgrade")}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                activeTab === "upgrade"
                  ? "text-purple-600 font-semibold bg-purple-50"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <RocketLaunchIcon className="h-5 w-5" />
              {!isCollapsed && "Upgrade"}
            </button>
          </nav>
        </div>

        <div className="p-4 text-sm text-gray-600 space-y-3">
          <a
            href="#"
            className="flex items-center gap-3 hover:text-purple-600 px-3 py-2 rounded"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
            {!isCollapsed && "Help"}
          </a>
          <div className="flex items-center gap-3 px-3">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            {!isCollapsed && (
              <div>
                <p className="text-gray-800">Username</p>
                <p className="text-xs text-gray-500">username@gmail.com</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute z-10 top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 flex items-center justify-center transition"
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="w-4 h-4" />
          ) : (
            <ChevronDoubleLeftIcon className="w-4 h-4" />
          )}
        </button>
      </aside>

      <main className="bg-gray-50 min-h-screen transition-all duration-300 p-10 flex-1 overflow-y-auto">
        <div className="text-sm text-gray-500 mb-4">
          Home Page / {project?.name || "Untitled Project"} /
          <span className="text-purple-600 font-medium">
            {activeTab === "upload" ? " Add your podcast" : activeTab}
          </span>
        </div>

        {viewingIndex !== null ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  setViewingIndex(null);
                  setEditMode(false);
                }}
                className="text-black flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-5 h-5" /> Edit Transcript
              </button>
              {editMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-red-400 text-red-500 rounded hover:bg-red-50 font-semibold"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => {
                      const updated = [...uploadedFiles];
                      updated[viewingIndex].transcript = editedTranscript;
                      setUploadedFiles(updated);
                      setEditMode(false);
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditMode(true);
                    setEditedTranscript(uploadedFiles[viewingIndex].transcript);
                  }}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-purple-700 font-semibold mb-3">Speaker</h3>
              {editMode ? (
                <textarea
                  className="w-full h-60 p-3 border rounded outline-none focus:ring-2 focus:ring-purple-500"
                  value={editedTranscript}
                  onChange={(e) => setEditedTranscript(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {uploadedFiles[viewingIndex].transcript}
                </p>
              )}
            </div>
          </>
        ) : (
          <div>
            {activeTab === "upload" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Add Podcast</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div
                    onClick={() => openModal("rss")}
                    className="cursor-pointer bg-white border shadow-md rounded p-4 py-8 hover:shadow-lg transition flex-1"
                  >
                    <div className="flex items-center justify-between h-full">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          RSS Feed
                        </h3>
                        <p className="text-md text-gray-500 leading-snug">
                          Lorem ipsum dolor sit. Dolor lorem sit.
                        </p>
                      </div>
                      <img
                        src={rss}
                        alt="YouTube Logo"
                        className="h-15 w-12 object-contain ml-4 rounded-xl"
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => openModal("youtube")}
                    className="cursor-pointer bg-white border shadow-md rounded p-4 py-8 hover:shadow-lg transition flex-1"
                  >
                    <div className="flex items-center justify-between h-full">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          Youtube Video
                        </h3>
                        <p className="text-md text-gray-500 leading-snug">
                          Lorem ipsum dolor sit. Dolor lorem sit.
                        </p>
                      </div>
                      <img
                        src={youtube}
                        alt="YouTube Logo"
                        className="h-15 w-12 object-contain ml-4 rounded-xl"
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => openModal("file")}
                    className="cursor-pointer bg-white border shadow-md rounded p-4 py-8 hover:shadow-lg transition flex-1"
                  >
                    <div className="flex items-center justify-between h-full">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          Upload Files
                        </h3>
                        <p className="text-md text-gray-500 leading-snug">
                          Lorem ipsum dolor sit. Dolor lorem sit.
                        </p>
                      </div>
                      <div className="h-15 w-12 object-contain ml-4 rounded-xl shadow-md bg-white flex items-center justify-center">
                        <ArrowUpTrayIcon className="h-10 w-10 text-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-300 p-10 rounded-xl text-center shadow-sm">
                  <CloudArrowUpIcon className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                  <p className="text-gray-700 text-sm mb-2">
                    Select a file or drag and drop here (Podcast Media or
                    Transcription Text)
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                  </p>
                  <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full text-sm hover:bg-purple-50">
                    Select File
                  </button>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="bg-white mt-10 rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <h3 className="bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 border-b">
                      Your Files
                    </h3>
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
                        <tr>
                          <th className="px-6 py-3">No.</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Upload Date & Time</th>
                          <th className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedFiles.map((file, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="px-6 py-3 font-semibold">
                              {index + 1}
                            </td>
                            <td className="px-6 py-3 font-semibold">
                              {file.name}
                            </td>
                            <td className="px-6 py-3 font-semibold whitespace-nowrap">
                              {file.date} | {file.time}
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex gap-2 font-semibold">
                                <button
                                  className="text-gray-700 border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 text-sm"
                                  onClick={() => setViewingIndex(index)}
                                >
                                  View
                                </button>

                                <button
                                  className="text-red-500 border border-red-300 px-4 py-1 rounded hover:bg-red-50 text-sm"
                                  onClick={() => {
                                    const updated = [...uploadedFiles];
                                    updated.splice(index, 1);
                                    setUploadedFiles(updated);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-3xl rounded-lg p-6 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              {getUploadIcon()}
              <h2 className="text-xl font-bold">{getUploadTitle()}</h2>
            </div>
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Transcript"
                rows={4}
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={handleUpload}
                className="bg-purple-900 text-white px-6 py-2 rounded hover:bg-purple-700 float-right"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFlowPage;
