function compilar_less(){
	for file in *.less
	do
		lessc --clean-css "$file" > ../css/"$(basename "$file" .less).css"
		echo "$file" "-> ../html/css/$(basename "$file" .less).css"
	done
}

function compilar_arg_less(){
	for arg in ${BASH_ARGV[*]}
	do
		find ./ -maxdepth 1 -name "$arg" | while read file; 
		do
			lessc --clean-css "$file" > ../css/"$(basename "$file" .less).css"
			if [ "$?" != '1' ]
				then
					echo "$file" "-> ../html/css/$(basename "$file" .less).css"
			fi
		done
	done
}

if [ $# -eq 0 ];  then
	echo "sin args"
	compilar_less
else
	echo "con args"
	compilar_arg_less
fi
