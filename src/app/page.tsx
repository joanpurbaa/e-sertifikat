"use client";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFile(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	useEffect(() => {
		if (file) {
			console.log(file);
		}
	}, [file]);
	return (
		<>
			<main className="h-screen p-10">
				<div className="h-full" {...getRootProps()}>
					{file ? (
						<>
							<div className="flex justify-between">
								<h1 className="text-2xl font-black">Tambahkan komponen sertifikat</h1>
								<button
									data-modal-target="default-modal"
									data-modal-toggle="default-modal"
									className="block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
									type="button">
									Preview sertifikat
								</button>
							</div>
							<form className="mt-5">
								<div className="mb-6">
									<label
										htmlFor="text"
										className="block mb-2 text-lg font-bold text-black">
										Nama kegiatan
									</label>
									<input
										type="text"
										id="text"
										className="bg-gray-50 border border-zinc-700 text-base font-semibold rounded-lg block w-full p-2.5 outline-none"
										placeholder="Cth *Seminar Mental Health Nasional"
										required
									/>
								</div>
								<div className="mb-6">
									<label
										htmlFor="text"
										className="block mb-2 text-lg font-bold text-black">
										Penyelenggara kegiatan
									</label>
									<input
										type="text"
										id="text"
										className="bg-gray-50 border border-zinc-700 text-base font-semibold rounded-lg block w-full p-2.5 outline-none"
										placeholder="Cth *Kemendikbud"
										required
									/>
								</div>
								<div className="mb-6">
									<label
										htmlFor="text"
										className="block mb-2 text-lg font-bold text-black">
										Nama penandatangan 1 (tanda tangan bagian kiri)
									</label>
									<input
										type="text"
										id="text"
										className="bg-gray-50 border border-zinc-700 text-base font-semibold rounded-lg block w-full p-2.5 outline-none"
										placeholder="Cth *Kemendikbud"
										required
									/>
								</div>
								<div className="mb-6">
									<label
										htmlFor="text"
										className="block mb-2 text-lg font-bold text-black">
										Nama penandatangan 2 (tanda tangan bagian tengah)
									</label>
									<input
										type="text"
										id="text"
										className="bg-gray-50 border border-zinc-700 text-base font-semibold rounded-lg block w-full p-2.5 outline-none"
										placeholder="Cth *Kemendikbud"
										required
									/>
								</div>
								<div className="mb-6">
									<label
										htmlFor="text"
										className="block mb-2 text-lg font-bold text-black">
										Nama penandatangan 3 (tanda tangan bagian kanan)
									</label>
									<input
										type="text"
										id="text"
										className="bg-gray-50 border border-zinc-700 text-base font-semibold rounded-lg block w-full p-2.5 outline-none"
										placeholder="Cth *Kemendikbud"
										required
									/>
								</div>
								<button
									type="submit"
									className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
									Submit
								</button>
							</form>
						</>
					) : (
						<>
							<div className="flex flex-col items-center">
								<h1 className="text-4xl font-black text-blue-600">eSertifikat</h1>
								<p className="font-semibold">Buat sertifikat dalam sekejap!</p>
							</div>
							<input {...getInputProps()} />
							<div className="mt-5 flex items-center justify-center w-full h-full pb-5">
								<label
									htmlFor="dropzone-file"
									className="flex flex-col items-center justify-center w-full h-full border-8 border-blue-700 border-dashed rounded-lg cursor-pointer hover:bg-blue-100">
									<div className="flex flex-col items-center justify-center">
										<svg
											className="w-18 h-18 mb-4 text-black"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="mb-2 text-xl text-black">
											<span className="font-bold">Click to upload</span> or drag and drop
										</p>
										<p className="text-lg font-semibold text-black">
											PNG, JPG or JPEG
										</p>
									</div>
								</label>
							</div>
						</>
					)}
				</div>
			</main>
		</>
	);
}
