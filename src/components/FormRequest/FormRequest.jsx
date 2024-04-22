import React, { useState, useEffect } from "react";

function FormRequest({ onSubmit }) {
  const [constructors, setConstructors] = useState([]);
  const [selectedConstructor, setSelectedConstructor] = useState("");
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    setConstructors([
      { id: "1", name: "Конструктор 1" },
      { id: "2", name: "Конструктор 2" },
      { id: "3", name: "Конструктор 3" },
      // ... дополнительные конструкторы ...
    ]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({
        constructorId: selectedConstructor,
        documentName: documentName,
      });
    }

  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <div className="form-group">
        <label htmlFor="constructorSelect">Выберите конструктора:</label>
        <select
          id="constructorSelect"
          value={selectedConstructor}
          onChange={(e) => setSelectedConstructor(e.target.value)}
          required
        >
          <option value="">Выберите...</option>
          {constructors.map((constructor) => (
            <option key={constructor.id} value={constructor.id}>
              {constructor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="documentName">Название документа:</label>
        <input
          id="documentName"
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        Отправить запрос
      </button>
    </form>
  );
}

export default FormRequest;
