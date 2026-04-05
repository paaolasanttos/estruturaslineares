// formatar o campo de hora
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("tempo");

    // valor inicial
    input.value = "00:00:00";

    input.addEventListener("keydown", function (e) {
        e.preventDefault();

        let valor = input.value.replace(/\D/g, "");

        if (e.key >= "0" && e.key <= "9") {
            valor += e.key;
        } else if (e.key === "Backspace") {
            valor = valor.slice(0, -1);
        } else {
            return;
        }

        valor = valor.padStart(6, "0").slice(-6);

        const h = valor.slice(0, 2);
        const m = valor.slice(2, 4);
        const s = valor.slice(4, 6);

        input.value = `${h}:${m}:${s}`;
    });
});

function validarTempo(t) {
    return /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(t);
}

function tempoParaMinutos(t) {

    if (!validarTempo(t)) return 0;

    const [h, m, s] = t.split(":").map(Number);

    return (h * 60) + m + (s / 60);
}

//treinar IA
async function modeloIA(minutos) {

    if (!minutos || isNaN(minutos)) return 0;

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    const x = tf.tensor2d([10, 20, 30, 40], [4, 1]);
    const y = tf.tensor2d([60, 120, 180, 240], [4, 1]);

    await model.fit(x, y, { epochs: 100 });

    const pred = model.predict(tf.tensor2d([minutos], [1, 1]));
    const valor = pred.dataSync()[0];

    return isNaN(valor) ? 0 : valor;
}

//bloquear campos durante o calculo
function bloquearCampos() {
    ["tempo", "peso", "idade", "atividade", "sexo"].forEach(id => {
        document.getElementById(id).disabled = true;
    });

    const btn = document.getElementById("btnAcao");
    btn.innerHTML = '<span class="material-icons">refresh</span>';
    btn.onclick = recalcular;
}

//liberar os campos para novo calculo
function liberarCampos() {
    ["tempo", "peso", "idade", "atividade", "sexo"].forEach(id => {
        document.getElementById(id).disabled = false;
    });

    document.getElementById("tempo").value = "00:00:00";

    const btn = document.getElementById("btnAcao");
    btn.innerHTML = '<span class="material-icons">play_arrow</span>';
    btn.onclick = treinarEPrever;

    document.getElementById("status").innerText = "Status: Aguardando...";
    document.getElementById("resultado").innerText = "";
}

//calcular as calorias
async function treinarEPrever() {

    const tempo = document.getElementById("tempo").value;
    const peso = Number(document.getElementById("peso").value);
    const atividade = Number(document.getElementById("atividade").value);
    const sexo = Number(document.getElementById("sexo").value);

    const status = document.getElementById("status");
    const resultado = document.getElementById("resultado");

    if (!validarTempo(tempo)) {
        status.innerText = "❌ Tempo inválido!";
        return;
    }

    if (!peso || peso <= 0) {
        status.innerText = "❌ Peso inválido!";
        return;
    }

    if (!atividade) {
        status.innerText = "❌ Atividade não informada!";
        return;
    }

    if (!sexo) {
        status.innerText = "❌ Sexo não informado!";
        return;
    }

    status.innerText = "Calculando...";

    const minutos = tempoParaMinutos(tempo);

    if (!minutos) {
        status.innerText = "❌ Tempo inválido!";
        return;
    }

    const caloriasBase = atividade * peso * (minutos / 60) * sexo;

    const ajuste = await modeloIA(minutos);

    const total = caloriasBase + (ajuste * 0.05);

    if (isNaN(total)) {
        status.innerText = "❌ Situação inesperada. Entre em contato com o suporte técnico!";
        return;
    }

    resultado.innerText = `🔥 ${total.toFixed(2)} kcal queimadas`;
    status.innerText = "✅ Concluído!";

    bloquearCampos();
}

function recalcular() {
    liberarCampos();
}