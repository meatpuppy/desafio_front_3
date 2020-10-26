import React from "react";
import "./App.css";

// admin@cubos.academy
// vouserdev

// Fetches =======================================================================================================================================

//=======================================================================================================================================

function App() {
  const [rodadaAtual, setRodadaAtual] = React.useState(1);
  const [rodadas, setRodadas] = React.useState({});
  const [classif, setClassif] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [order, setOrder] = React.useState();
  const [editar, setEditar] = React.useState(null);
  const [golsCasa, setGolsCasa] = React.useState();
  const [golsVisitante, setGolsVisitante] = React.useState();

  React.useEffect(() => {
    fetchRodada(rodadaAtual);
  }, []);

  React.useEffect(() => {
    async function abc() {
      setClassif(await fetchClassif());
    }
    abc();
  }, []);

  React.useEffect(() => {
    console.log(token);
    if (token) alert("logado com sucesso");
  }, [token]);

  // Fetches ======================================================================================================================================

  const fetchEditar = (conteudo) => {
    return fetch("https://desafio-3-back-cubos-academy.herokuapp.com/jogos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token && `Bearer ${token}`,
      },
      body: JSON.stringify(conteudo),
    })
      .then((res) => res.json())
      .then((resposta) => {
        setEditar(null);
      });
  };

  const fetchLogin = (email, senha) => {
    return fetch("https://desafio-3-back-cubos-academy.herokuapp.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    })
      .then((res) => res.json())
      .then((resposta) => {
        setToken(resposta.dados.token);
      });
  };

  const fetchRodada = async (numeroRodada) => {
    return fetch(
      "https://desafio-3-back-cubos-academy.herokuapp.com/jogos/" + numeroRodada
    )
      .then((res) => res.json())
      .then((resposta) => {
        setRodadas(resposta);
      });
  };

  const fetchClassif = async () => {
    const response = await fetch(
      "https://desafio-3-back-cubos-academy.herokuapp.com/classificacao"
    );

    const classif = await response.json();
    classif.dados = classif.dados
      .sort((a, b) => {
        return a.pontos < b.pontos;
      })
      .map((dado, index) => ({ ...dado, pos: index + 1 }));

    return classif;
  };

  // Ordenar =======================================================================================================================================

  const sortEmp = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.empates < b.empates;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.empates > b.empates;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortVit = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.vitorias < b.vitorias;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.vitorias > b.vitorias;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortDer = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.derrotas < b.derrotas;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.derrotas > b.derrotas;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortGF = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsFeitos < b.golsFeitos;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsFeitos > b.golsFeitos;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortGS = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsSofridos < b.golsSofridos;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsSofridos > b.golsSofridos;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortSG = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsFeitos - a.golsSofridos < b.golsFeitos - b.golsSofridos;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.golsFeitos - a.golsSofridos > b.golsFeitos - b.golsSofridos;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortPos = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.pos < b.pos;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.pos > b.pos;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  const sortNome = () => {
    let sortedDados;
    if (order === "decrescente") {
      setOrder("crescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.nome < b.nome;
      });
    } else {
      setOrder("decrescente");
      sortedDados = classif.dados.sort((a, b) => {
        return a.nome > b.nome;
      });
    }
    setClassif({ ...classif, dados: sortedDados });
  };

  //=======================================================================================================================================

  return (
    <div className="App">
      <div className="header">
        <div className="brasileirao">Brasileirão</div>

        {token === null ? (
          <div className="login">
            <div>
              Email
              <input
                type="text"
                id="email"
                onInput={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div>
              Senha
              <input
                type="password"
                id="senha"
                onInput={(event) => setSenha(event.target.value)}
              ></input>
            </div>
            <button
              onClick={() => {
                fetchLogin(email, senha);
              }}
            >
              Logar
            </button>
          </div>
        ) : (
          <div className="login">
            {" "}
            Seja bem vindo
            <button
              onClick={() => {
                setToken(null);
              }}
            >
              Deslogar
            </button>
          </div>
        )}
      </div>

      <div className="divcorpo">
        <div className="rodadas">
          <div className="cabeca">
            <div
              onClick={async () => {
                if (rodadaAtual > 1) {
                  setRodadaAtual(rodadaAtual - 1);
                  fetchRodada(rodadaAtual - 1);
                }
              }}
            >
              <img
                src="https://systemuicons.com/images/icons/arrow_left.svg"
                alt="Rodada anterior"
              ></img>
            </div>

            <div className="divrodada">
              <div className="valorRodada">{rodadaAtual}</div>
              <div>ª rodada</div>
            </div>
            <div
              onClick={async () => {
                if (rodadaAtual < 38) {
                  setRodadaAtual(rodadaAtual + 1);
                  fetchRodada(rodadaAtual + 1);
                }
              }}
            >
              <img
                src="https://systemuicons.com/images/icons/arrow_right.svg"
                alt="Próxima rodada"
              ></img>
            </div>
          </div>
          <div className="tabela-rodadas">
            {rodadas &&
              rodadas.dados &&
              rodadas.dados.map((item) => (
                <div className="divtime">
                  <div>{item.time_casa}</div>
                  {editar !== item.id ? (
                    <div className="numero">{item.gols_casa}</div>
                  ) : (
                    <input
                      type="number"
                      value={golsCasa}
                      onInput={(event) => setGolsCasa(event.target.value)}
                    ></input>
                  )}
                  <div>x</div>
                  {editar !== item.id ? (
                    <div className="numero">{item.gols_visitante}</div>
                  ) : (
                    <input
                      type="number"
                      value={golsVisitante}
                      onInput={(event) => setGolsVisitante(event.target.value)}
                    ></input>
                  )}

                  <div>{item.time_visitante}</div>
                  {token && (
                    <div
                      className="editar"
                      onClick={async () => {
                        if (editar == null) {
                          setEditar(item.id);
                          setGolsCasa(item.gols_casa)
                          setGolsVisitante(item.gols_visitante)
                        } else {
                          await fetchEditar({
                            id: item.id,
                            golsCasa: golsCasa,
                            golsVisitante: golsVisitante,
                          });
                          fetchRodada(rodadaAtual);
                        }
                      }}
                    >
                      {editar !== item.id ? (
                        <img src="https://systemuicons.com/images/icons/pen.svg"></img>
                      ) : (
                        <img src="https://systemuicons.com/images/icons/check.svg"></img>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="classificacao">
          <div className="cabecaclassif">
            <div>
              Posição
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortPos}
              ></img>
            </div>
            <div>
              Time
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortNome}
              ></img>
            </div>
            <div>
              PTS
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortPos}
              ></img>
            </div>
            <div>
              E
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortEmp}
              ></img>
            </div>
            <div>
              V
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortVit}
              ></img>
            </div>
            <div>
              D
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortDer}
              ></img>
            </div>
            <div>
              GF
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortGF}
              ></img>
            </div>
            <div>
              GS
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortGS}
              ></img>
            </div>
            <div>
              SG
              <img
                src="https://systemuicons.com/images/icons/sort.svg"
                alt="Ordenação"
                onClick={sortSG}
              ></img>
            </div>
          </div>
          <div className="tabela-classif">
            {classif.dados &&
              classif.dados.map((item, index) => (
                <div className="time" key={item.pos}>
                  <div>{item.pos}</div>
                  <div>{item.nome}</div>
                  <div>{item.pontos}</div>
                  <div>{item.empates}</div>
                  <div>{item.vitorias}</div>
                  <div>{item.derrotas}</div>
                  <div>{item.golsFeitos}</div>
                  <div>{item.golsSofridos}</div>
                  <div>{item.golsFeitos - item.golsSofridos}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
