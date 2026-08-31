"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  EDUCATION,
  MONTH,
  SPECIALTIES,
} from "@/lib/accred/specialization";

import {
  Upload,
  FileText,
  Trash2,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";

import { useToast } from "@/components/ui/Toast/ToastProvider";

interface AccredItem {
  id: number;
  year: number;
  month: string;
  education: string;
  specialization: string;
  stage: string;
  name: string;
  link: string;
  created_at: string;
}

const STAGES = [
  "Основной этап",
  "Второй этап",
  "Итоги",
];

export default function Page() {
  const toast = useToast();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    year: new Date().getFullYear().toString(),
    month: "",
    education: "",
    specialization: "",
    stage: "",
    name: "",
  });

  const [file, setFile] =
    useState<File | null>(null);

  const [items, setItems] =
    useState<AccredItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingItems, setLoadingItems] =
    useState(true);

  const [dragActive, setDragActive] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const loadItems = async () => {
    try {
      setLoadingItems(true);

      const response = await fetch(
        "/api/admin/accred",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Не удалось загрузить протоколы"
        );
      }

      setItems(data.items || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Ошибка загрузки протоколов"
      );
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const handleFile = (
    selectedFile: File | null
  ) => {
    if (!selectedFile) return;

    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error(
        "Файл слишком большой. Максимум 20 МБ"
      );
      return;
    }

    setFile(selectedFile);

    const fileName =
      selectedFile.name.replace(
        /\.[^/.]+$/,
        ""
      );

    setForm((prev) => ({
      ...prev,
      name: prev.name || fileName,
    }));
  };


  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragActive(false);

    const droppedFile =
      e.dataTransfer.files?.[0];

    handleFile(droppedFile || null);
  };


  const handleSubmit = async () => {
    if (!file) {
      toast.error("Выберите файл");
      return;
    }

    if (
      !form.year ||
      !form.month ||
      !form.education ||
      !form.specialization ||
      !form.stage
    ) {
      toast.error(
        "Заполните все обязательные поля"
      );
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("year", form.year);
      data.append("month", form.month);
      data.append(
        "education",
        form.education
      );
      data.append(
        "specialization",
        form.specialization
      );
      data.append("stage", form.stage);
      data.append("name", form.name);
      data.append("file", file);

      const response = await fetch(
        "/api/admin/accred",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Ошибка загрузки"
        );
      }

      toast.success(
        "Протокол успешно загружен"
      );

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setForm((prev) => ({
        ...prev,
        month: "",
        education: "",
        specialization: "",
        stage: "",
        name: "",
      }));


      await loadItems();

    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Ошибка загрузки протокола"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Удалить этот протокол?\n\nФайл также будет удалён из хранилища."
      );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `/api/admin/accred?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Ошибка удаления"
        );
      }

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

      toast.success(
        "Протокол удалён"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось удалить протокол"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const removeSelectedFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <Upload size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Протоколы аккредитации
              </h1>

              <p className="text-sm text-gray-500">
                Загрузка и управление документами
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Год
            </label>

            <input
              value={form.year}
              onChange={(e) =>
                handleChange(
                  "year",
                  e.target.value
                )
              }
              placeholder="2026"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Месяц
            </label>

            <select
              value={form.month}
              onChange={(e) =>
                handleChange(
                  "month",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">
                Выберите месяц
              </option>

              {MONTH.map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Уровень образования
            </label>

            <select
              value={form.education}
              onChange={(e) =>
                handleChange(
                  "education",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">
                Выберите образование
              </option>

              {EDUCATION.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Специализация
            </label>

            <select
              value={form.specialization}
              onChange={(e) =>
                handleChange(
                  "specialization",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">
                Выберите специализацию
              </option>

              {SPECIALTIES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Этап
            </label>

            <select
              value={form.stage}
              onChange={(e) =>
                handleChange(
                  "stage",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">
                Выберите этап
              </option>

              {STAGES.map((stage) => (
                <option
                  key={stage}
                  value={stage}
                >
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Название документа
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
              placeholder="Например: Протокол заседания комиссии"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

        </div>

        <div className="mt-5">

          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Документ
          </label>

          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() =>
                setDragActive(false)
              }
              onDrop={handleDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className={`
                cursor-pointer rounded-2xl border-2 border-dashed
                p-8 text-center transition
                ${
                  dragActive
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-teal-400 hover:bg-gray-50"
                }
              `}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <Upload size={22} />
              </div>

              <p className="font-medium text-gray-800">
                Перетащите файл сюда
              </p>

              <p className="mt-1 text-sm text-gray-500">
                или нажмите, чтобы выбрать
              </p>

              <p className="mt-3 text-xs text-gray-400">
                Максимальный размер — 20 МБ
              </p>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) =>
                  handleFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-teal-100 bg-teal-50 p-4">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600">
                  <FileText size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} МБ
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={removeSelectedFile}
                className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white hover:text-red-500"
              >
                <X size={18} />
              </button>

            </div>
          )}

        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />
              Загружаем...
            </>
          ) : (
            <>
              <Upload size={19} />
              Загрузить протокол
            </>
          )}
        </button>

      </div>

      <div className="mt-8 rounded-[2rem] border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5 md:px-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Загруженные протоколы
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Всего документов: {items.length}
              </p>
            </div>

          </div>

        </div>

        {loadingItems ? (
          <div className="flex justify-center py-12">
            <Loader2
              className="animate-spin text-gray-400"
              size={24}
            />
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FileText
              size={35}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-medium text-gray-700">
              Протоколов пока нет
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Загруженные документы появятся здесь
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">

            {items.map((item) => (
              <div
                key={item.id}
                className="px-6 py-5 transition hover:bg-gray-50 md:px-8"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0">

                      <p className="font-medium text-gray-900">
                        {item.name}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                        <span>
                          {item.year}
                        </span>

                        <span>•</span>

                        <span>
                          {item.month}
                        </span>

                        <span>•</span>

                        <span>
                          {item.specialization}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">

                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                          {item.education}
                        </span>

                        <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs text-teal-700">
                          {item.stage}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="flex shrink-0 gap-2">

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
                    >
                      <ExternalLink
                        size={16}
                      />
                      Открыть
                    </a>

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        item.id
                      }
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      {deletingId ===
                      item.id ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2
                          size={16}
                        />
                      )}

                      Удалить
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}