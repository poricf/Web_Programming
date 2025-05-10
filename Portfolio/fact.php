<?php
$facts = [
    "PHP powers over 70% of the web.",
    "Fahmi D writes clean, creative code.",
    "This page is served dynamically with PHP.",
    "Backend magic can be simple and elegant.",
    "Dark mode + dynamic code = 💡"
];

$randomFact = $facts[array_rand($facts)];
echo json_encode([
    "fact" => $randomFact,
    "time" => date("H:i:s")
]);
?>
