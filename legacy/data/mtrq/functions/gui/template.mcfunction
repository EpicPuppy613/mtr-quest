# GUI ITEMS
# O: black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
# X: white_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}

# GUI LAYOUT
# O O O O O O O O O
# O O O O X O O O O
# O O O O O O O O O

# Clear GUI items from the player's inventory
clear @s black_stained_glass_pane{mtrqgui:1b}
clear @s white_stained_glass_pane{mtrqgui:1b}

# Detect clicks
execute unless data block ~ ~ ~ Items[{Slot:13}] run function click_function

# Fill in the GUI
item replace block ~ ~ ~ container.0 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.1 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.2 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.3 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.4 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.5 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.6 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.7 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.8 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.9 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.10 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.11 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.12 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.13 with white_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.14 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.15 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.16 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.17 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.18 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.19 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.20 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.21 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.22 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.23 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.24 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.25 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.26 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}